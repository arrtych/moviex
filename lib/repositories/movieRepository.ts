import { prisma } from "@/lib/db/prisma";
import { handlePrismaError } from "@/lib/db/utils";
import { Prisma } from "@prisma/client";

export class MovieRepository {
  async findAll() {
    try {
      return await prisma.movie.findMany({
        include: {
          ratings: true,
          reviews: {
            include: {
              user: {
                select: {
                  name: true,
                  image: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async findById(id: string) {
    try {
      const movie = await prisma.movie.findUnique({
        where: { id },
        include: {
          ratings: true,
          reviews: {
            include: {
              user: {
                select: {
                  name: true,
                  image: true,
                },
              },
            },
          },
        },
      });

      if (!movie) {
        throw new Error("Movie not found");
      }

      return movie;
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async create(data: Prisma.MovieCreateInput) {
    try {
      return await prisma.movie.create({
        data,
        include: {
          ratings: true,
          reviews: true,
        },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async update(id: string, data: Prisma.MovieUpdateInput) {
    try {
      return await prisma.movie.update({
        where: { id },
        data,
        include: {
          ratings: true,
          reviews: true,
        },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async delete(id: string) {
    try {
      return await prisma.movie.delete({
        where: { id },
      });
    } catch (error) {
      handlePrismaError(error);
    }
  }
}
