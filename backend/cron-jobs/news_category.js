const { CronJob } = require("cron");
const CategoryService = require("../services/category");
const InshortsAPIService = require("../services/inshorts");

const dotenv = require("dotenv");
dotenv.config();

const fetchTrendingNewsCategories = async () => {
  try {
    const [stored_categories, latest_categories] = await Promise.all([
      CategoryService.getCategories(),
      InshortsAPIService.getNewsCategories(),
    ]);

    const stored_categories_tags = stored_categories.map(
      (stored_category) => stored_category.tag
    );

    const new_categories = latest_categories.filter(
      (category) => !stored_categories_tags.includes(category.tag)
    );

    // console.log(new_categories.length);

    if (new_categories.length > 0) {
      console.log(`${new_categories.length} categories will be added`);
      CategoryService.addCategories(new_categories);
    } else {
      console.log(`No new categories found`);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const job = new CronJob(
  // every 6:00 AM on 1st day of the month
  "0 6 1 * *",
  fetchTrendingNewsCategories,
  null,
  true,
  "Asia/Kolkata"
);

console.log(job.nextDate());
job.start();
