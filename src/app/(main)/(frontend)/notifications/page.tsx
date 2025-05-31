"use client";
import Link from "next/link";
import { Bell, Check, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import EmptyState from "@/components/empty-state";
import { useMovies } from "@/context/movie-context";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import RatingDisplay from "@/components/rating-display";
import { useState } from "react";

export default function NotificationsPage() {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } =
    useMovies();

  // Filter notifications by type
  const newContentNotifications = notifications.filter(
    (notification) => notification.type === "new_content"
  );
  const recommendationNotifications = notifications.filter(
    (notification) => notification.type === "recommendation"
  );
  const systemNotifications = notifications.filter(
    (notification) => notification.type === "system"
  );

  const handleMarkAllAsRead = () => {
    markAllNotificationsAsRead();
  };

  const handleMarkAsRead = (id: string) => {
    markNotificationAsRead(id);
  };

  if (notifications.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 pt-24">
        <EmptyState
          type="collection-not-found"
          title="No Notifications"
          description="You don't have any notifications yet."
          actionLabel="Back to Home"
          actionHref="/"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>

        <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
          <CheckCheck className="h-4 w-4 mr-2" />
          Mark all as read
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
          <TabsTrigger value="new_content">
            New Content ({newContentNotifications.length})
          </TabsTrigger>
          <TabsTrigger value="recommendations">
            Recommendations ({recommendationNotifications.length})
          </TabsTrigger>
          <TabsTrigger value="system">
            System ({systemNotifications.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="space-y-4">
            {notifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="new_content">
          <div className="space-y-4">
            {newContentNotifications.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No new content notifications
              </p>
            ) : (
              newContentNotifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={handleMarkAsRead}
                />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="recommendations">
          <div className="space-y-4">
            {recommendationNotifications.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No recommendation notifications
              </p>
            ) : (
              recommendationNotifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={handleMarkAsRead}
                />
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="system">
          <div className="space-y-4">
            {systemNotifications.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No system notifications
              </p>
            ) : (
              systemNotifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={handleMarkAsRead}
                />
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface NotificationCardProps {
  notification: {
    id: string;
    type: "new_content" | "recommendation" | "system";
    title: string;
    message: string;
    movieId?: string;
    createdAt: string;
    read: boolean;
  };
  onMarkAsRead: (id: string) => void;
}

function NotificationCard({
  notification,
  onMarkAsRead,
}: NotificationCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const { movies } = useMovies();
  const movie = notification.movieId
    ? movies.find((m) => m.id === notification.movieId)
    : undefined;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "new_content":
        return <Bell className="h-5 w-5 text-blue-500" />;
      case "recommendation":
        return <Bell className="h-5 w-5 text-green-500" />;
      case "system":
        return <Bell className="h-5 w-5 text-yellow-500" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  return (
    <Card
      className={`transition-colors ${
        notification.read ? "bg-card" : "bg-muted/30"
      }`}
    >
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="flex-shrink-0 mt-1">
            {getTypeIcon(notification.type)}
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3
                className={`font-medium ${
                  notification.read ? "" : "font-semibold"
                }`}
              >
                {notification.title}
              </h3>

              <span className="text-xs text-muted-foreground">
                {new Date(notification.createdAt).toLocaleDateString()}
              </span>
            </div>

            <p className="text-sm text-muted-foreground mt-1 mb-3">
              {notification.message}
            </p>

            <div className="flex justify-between items-center">
              {notification.movieId && (
                <Button
                  variant="link"
                  size="sm"
                  className="px-0 h-auto"
                  onClick={() => setShowDetails(true)}
                >
                  View Details
                </Button>
              )}

              {!notification.read && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onMarkAsRead(notification.id)}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Mark as read
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      {movie && (
        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{notification.title}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col space-y-4 py-4">
              <div className="flex space-x-4">
                <div className="relative w-24 h-36 flex-shrink-0">
                  <Image
                    src={
                      movie.posterPath || "/placeholder.svg?height=144&width=96"
                    }
                    alt={movie.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{movie.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(movie.releaseDate).getFullYear()} •{" "}
                    {movie.genres.join(", ")}
                  </p>
                  <div className="mt-2">
                    <RatingDisplay
                      imdb={movie.ratings.imdb}
                      kinopoisk={movie.ratings.kinopoisk}
                      size="sm"
                    />
                  </div>
                </div>
              </div>
              <p className="text-sm">{notification.message}</p>
              <div className="text-xs text-muted-foreground">
                {new Date(notification.createdAt).toLocaleString()}
              </div>
              <div className="flex justify-end">
                <Link href={`/film/${movie.slug}`}>
                  <Button>Go to Movie</Button>
                </Link>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
}
