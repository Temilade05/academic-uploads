import cron from "node-cron";
import ImageModel from "./models/Image";
import constants from "./utils/constants";
import logger from "./utils/logger";

const { DISAPPROVED } = constants.imageStatus;
const cronJob = async () => {
  //run every minute
  const deleteDisapprovedImages = cron.schedule("0 */1 * * * *", async () => {
    try {
      ImageModel.deleteMany({ status: DISAPPROVED });
    } catch (error: any) {
      logger.error("Error deleteing disapproved images");
      logger.error(error);
    }
  });

  deleteDisapprovedImages.start();
};

export default cronJob;
