"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { useQuery } from "@tanstack/react-query"
import { Save, Moon, Sun, Monitor, Trash2, Database, HardDrive, Server, Cloud } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import type { Storage } from "@/types/movie"
import { EditStorageModal } from "@/components/edit-storage-modal"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("general")

  // General settings
  const [autoplay, setAutoplay] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [language, setLanguage] = useState("en")

  // Library settings
  const [downloadPath, setDownloadPath] = useState("/movies")
  const [maxDownloads, setMaxDownloads] = useState(3)
  const [autoDeleteFiles, setAutoDeleteFiles] = useState(false)

  // Playback settings
  const [defaultQuality, setDefaultQuality] = useState("1080p")
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(true)
  const [subtitlesLanguage, setSubtitlesLanguage] = useState("en")
  const [volume, setVolume] = useState(80)

  const [editModalOpen, setEditModalOpen] = useState(false)
  const [currentStorage, setCurrentStorage] = useState<Storage | undefined>(undefined)
  const [isNewStorage, setIsNewStorage] = useState(false)

  const handleEditStorage = (storage: Storage) => {
    setCurrentStorage(storage)
    setIsNewStorage(false)
    setEditModalOpen(true)
  }

  const handleAddStorage = () => {
    setCurrentStorage(undefined)
    setIsNewStorage(true)
    setEditModalOpen(true)
  }

  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [storageToDelete, setStorageToDelete] = useState<Storage | null>(null)

  const handleRemoveStorage = (storage: Storage) => {
    setStorageToDelete(storage)
    setDeleteModalOpen(true)
  }

  const confirmRemoveStorage = () => {
    if (storageToDelete) {
      toast({
        title: "Storage removed",
        description: `Storage "${storageToDelete.name}" has been removed successfully`,
        variant: "default",
      })
      setDeleteModalOpen(false)
      setStorageToDelete(null)
    }
  }

  // Fetch storages
  const { data: storages = [] } = useQuery({
    queryKey: ["storages"],
    queryFn: async () => {
      const res = await fetch("/api/storages")
      if (!res.ok) throw new Error("Failed to fetch storages")
      return res.json()
    },
  })

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
    })
  }

  const handleResetSettings = () => {
    // Reset to defaults
    setAutoplay(true)
    setNotifications(true)
    setLanguage("en")
    setDownloadPath("/movies")
    setMaxDownloads(3)
    setAutoDeleteFiles(false)
    setDefaultQuality("1080p")
    setSubtitlesEnabled(true)
    setSubtitlesLanguage("en")
    setVolume(80)

    toast({
      title: "Settings reset",
      description: "Your settings have been reset to defaults.",
    })
  }

  // Get storage icon based on type
  const getStorageIcon = (type: string) => {
    switch (type) {
      case "local":
        return <HardDrive className="h-4 w-4 text-blue-500" />
      case "network":
        return <Server className="h-4 w-4 text-purple-500" />
      case "external":
        return <Database className="h-4 w-4 text-green-500" />
      case "cloud":
        return <Cloud className="h-4 w-4 text-sky-500" />
      default:
        return <HardDrive className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>

        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleResetSettings}>
            Reset
          </Button>
          <Button onClick={handleSaveSettings}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="library">Library</TabsTrigger>
          <TabsTrigger value="playback">Playback</TabsTrigger>
          <TabsTrigger value="storage">Storage</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize how MovieX looks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <div className="flex space-x-2">
                    <Button
                      variant={theme === "light" ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => setTheme("light")}
                    >
                      <Sun className="mr-2 h-4 w-4" />
                      Light
                    </Button>
                    <Button
                      variant={theme === "dark" ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => setTheme("dark")}
                    >
                      <Moon className="mr-2 h-4 w-4" />
                      Dark
                    </Button>
                    <Button
                      variant={theme === "system" ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => setTheme("system")}
                    >
                      <Monitor className="mr-2 h-4 w-4" />
                      System
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="ru">Русский</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Behavior</CardTitle>
                <CardDescription>Configure how MovieX behaves</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Autoplay videos</Label>
                    <p className="text-sm text-muted-foreground">Automatically play videos when opened</p>
                  </div>
                  <Switch checked={autoplay} onCheckedChange={setAutoplay} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications about new content and updates</p>
                  </div>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="library">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Download Settings</CardTitle>
                <CardDescription>Configure how movies are downloaded</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Default download path</Label>
                  <div className="flex space-x-2">
                    <Input value={downloadPath} onChange={(e) => setDownloadPath(e.target.value)} />
                    <Button variant="outline">Browse</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Maximum concurrent downloads</Label>
                    <span className="text-sm text-muted-foreground">{maxDownloads}</span>
                  </div>
                  <Slider
                    value={[maxDownloads]}
                    min={1}
                    max={10}
                    step={1}
                    onValueChange={(value) => setMaxDownloads(value[0])}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-delete files</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically delete files when removed from library
                    </p>
                  </div>
                  <Switch checked={autoDeleteFiles} onCheckedChange={setAutoDeleteFiles} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Library Management</CardTitle>
                <CardDescription>Manage your movie library</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">Scan library</h3>
                    <p className="text-sm text-muted-foreground">Scan your library folders for new content</p>
                  </div>
                  <Button>Scan Now</Button>
                </div>

                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">Clean library</h3>
                    <p className="text-sm text-muted-foreground">Remove missing files from your library</p>
                  </div>
                  <Button variant="outline">Clean</Button>
                </div>

                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium text-destructive">Clear library</h3>
                    <p className="text-sm text-muted-foreground">Remove all items from your library</p>
                  </div>
                  <Button variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear All
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="playback">
          <Card>
            <CardHeader>
              <CardTitle>Playback Settings</CardTitle>
              <CardDescription>Configure video playback preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Default quality</Label>
                <Select value={defaultQuality} onValueChange={setDefaultQuality}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select quality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto</SelectItem>
                    <SelectItem value="4k">4K</SelectItem>
                    <SelectItem value="1080p">1080p</SelectItem>
                    <SelectItem value="720p">720p</SelectItem>
                    <SelectItem value="480p">480p</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Subtitles</Label>
                  <p className="text-sm text-muted-foreground">Enable subtitles by default</p>
                </div>
                <Switch checked={subtitlesEnabled} onCheckedChange={setSubtitlesEnabled} />
              </div>

              <div className="space-y-2">
                <Label>Subtitle language</Label>
                <Select value={subtitlesLanguage} onValueChange={setSubtitlesLanguage} disabled={!subtitlesEnabled}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="ru">Russian</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Default volume</Label>
                  <span className="text-sm text-muted-foreground">{volume}%</span>
                </div>
                <Slider value={[volume]} min={0} max={100} step={5} onValueChange={(value) => setVolume(value[0])} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="storage">
          <Card>
            <CardHeader>
              <CardTitle>Storage Management</CardTitle>
              <CardDescription>Manage your storage locations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {storages.map((storage: Storage) => (
                  <div key={storage.id} className="flex items-start justify-between p-3 border rounded-lg">
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">{getStorageIcon(storage.type)}</div>
                      <div>
                        <h3 className="font-medium">{storage.name}</h3>
                        <p className="text-xs text-muted-foreground">{storage.path}</p>
                        {storage.totalSpace && storage.freeSpace && (
                          <div className="mt-2">
                            <div className="h-2 w-36 bg-muted rounded-full">
                              <div
                                className="h-full bg-blue-500 rounded-full"
                                style={{
                                  width: `${((storage.totalSpace - storage.freeSpace) / storage.totalSpace) * 100}%`,
                                }}
                              ></div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {storage.freeSpace} GB free of {storage.totalSpace} GB
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditStorage(storage)}>
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive"
                        onClick={() => handleRemoveStorage(storage)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}

                <Button className="w-full" onClick={() => handleAddStorage()}>
                  <HardDrive className="mr-2 h-4 w-4" />
                  Add Storage Location
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>About MovieX</CardTitle>
              <CardDescription>Information about your MovieX installation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">Version</h3>
                <p className="text-sm text-muted-foreground">1.0.0</p>
              </div>

              <div>
                <h3 className="font-medium">Build Date</h3>
                <p className="text-sm text-muted-foreground">March 23, 2025</p>
              </div>

              <div>
                <h3 className="font-medium">License</h3>
                <p className="text-sm text-muted-foreground">MIT License</p>
              </div>

              <div className="pt-4">
                <p className="text-sm text-muted-foreground">
                  MovieX is a personal film library management system. It allows you to organize, track, and manage your
                  movie collection.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Check for Updates</Button>
              <Button variant="link">View License</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      <EditStorageModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        storage={currentStorage}
        isNew={isNewStorage}
      />
      {storageToDelete && (
        <AlertDialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the storage location "{storageToDelete.name}"
                from your settings.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setStorageToDelete(null)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmRemoveStorage}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  )
}

