import { FilterQuery, UpdateQuery } from "mongoose";
import { Image } from "../models/Image";
import Repository, { IRepository } from "./repository";

export interface IImageRepository extends IRepository<Image> {
  createImage(
    url: string,
    courseCode: string,
    session: string
  ): Promise<Image | void>;

  createImages(
    urls: string[],
    courseCode: string,
    session: string
  ): Promise<Image[]>;
}

class ImageRepository extends Repository<Image> implements IImageRepository {
  async createImage(
    url: string,
    courseCode: string,
    session: string
  ): Promise<Image | void> {
    const image = await this.model.create({
      url,
      courseCode,
      session,
    });

    return image;
  }

  async createImages(
    urls: string[],
    courseCode: string,
    session: string
  ): Promise<Image[]> {
    const images = [];

    for (const url of urls) {
      const image = {
        url,
        courseCode,
        session,
      };

      images.push(image);
    }

    const result = await this.model.create(images);
    return result;
  }
}

export default ImageRepository;
