const dotenv = require("dotenv");
dotenv.config();

const { CronJob } = require("cron");
const CategoryService = require("../services/category");
const GlobalNewsService = require("../services/global_news");
const InshortsAPIService = require("../services/inshorts");

const category = {
  items: [],
  next() {
    const index = Math.floor(Math.random() * this.items.length);
    const nextCategory = this.items[index];
    nextCategory.current_page++;
    return nextCategory;
  },
};

const initializeCategories = async () => {
  try {
    const stored_categories = await CategoryService.getCategories();
    category.items = stored_categories.map(
      ({ tag, label, total_page, current_page }) => ({
        tag,
        label,
        total_page,
        current_page,
      })
    );
  } catch (error) {
    console.log(error.message);
  }
};

// const reloadCategories = async () => {
//   try {
//     const stored_categories = await CategoryService.getCategories();
//     category.items = stored_categories.map((category) => ({
//       label: category.label,
//       total_page: 1,
//       current_page: 0,
//     }));
//     console.log(category.next());
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// const reloadCategoriesJob = new CronJob(
//   // At 06:05 on day-of-month 1
//   "5 6 1 * *",
//   reloadCategories,
//   null,
//   true,
//   "Asia/Kolkata"
// );

// reloadCategoriesJob.start();

const fetchNews = async () => {
  try {
    // loads category items if empty
    if (category.items.length === 0) {
      await initializeCategories();
    }

    const nextCategory = category.next();

    if (nextCategory.current_page > nextCategory.total_page) {
      return;
    }

    const news = await InshortsAPIService.getNewsByCategory(
      nextCategory.tag,
      nextCategory.current_page
    );

    CategoryService.setCategoryCurrentPage(
      nextCategory.tag,
      nextCategory.current_page
    );

    if (nextCategory.total_page === 1) {
      CategoryService.setCategoryTotalPage(nextCategory.tag, news.total_page);
      nextCategory.total_page = news.total_page;
    }

    const news_data = news.news_list
      .filter((news_item) => news_item.news_obj)
      .map((news_item) => news_item.news_obj);

    await GlobalNewsService.addNewsByCategory(nextCategory.tag, news_data);
    console.log(news_data.length);
  } catch (error) {
    console.log(error.message);
  }
};
const fetchNewsJob = new CronJob(
  // At every 5th minute.
  "*/5 * * * *",
  fetchNews,
  null,
  true,
  "Asia/Kolkata"
);

// console.log(job);
fetchNewsJob.start();
