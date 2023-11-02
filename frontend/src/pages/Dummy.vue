<template>
  <div>
    <apexchart :options="options" :series="series" type="heatmap"></apexchart>
  </div>
</template>

<script>
export default {
  name: "the-dummy",
  components: {},
  created() {
    this.series.sort((a, b) => b.data.length - a.data.length);
  },
  data() {
    return {
      series: [
        {
          data: [
            { x: "Sports", y: 1 },
            { x: "Weather", y: 1 },
            { x: "Breaking News", y: 2 },
            { x: "Travel", y: 1 },
            { x: "Education", y: 1 },
            { x: "Lifestyle", y: 1 },
            { x: "Politics", y: 1 },
            { x: "Education & Learning", y: 1 },
            { x: "Tech Trends", y: 2 },
            { x: "Society & Lifestyle", y: 1 },
            { x: "Culture", y: 3 },
          ],
          name: "Chhattisgarh",
        },
        {
          data: [
            { x: "Entertainment", y: 1 },
            { x: "Technology", y: 1 },
            { x: "Tech Trends", y: 1 },
            { x: "Travel", y: 1 },
            { x: "Education", y: 2 },
            { x: "Culture", y: 2 },
            { x: "Sports", y: 1 },
          ],
          name: "Kerala",
        },

        {
          data: [
            { x: "Education", y: 1 },
            { x: "Business", y: 1 },
            { x: "Sports", y: 1 },
            { x: "Politics", y: 1 },
            { x: "Lifestyle", y: 1 },
            { x: "Gaming", y: 1 },
            { x: "Society & Lifestyle", y: 2 },
            { x: "Entertainment", y: 1 },
            { x: "Opinion/Editorials", y: 1 },
          ],
          name: "Arunachal Pradesh",
        },
        {
          data: [
            { x: "Technology", y: 1 },
            { x: "Education & Learning", y: 1 },
            { x: "Finance", y: 2 },
            { x: "Lifestyle", y: 1 },
            { x: "Environment", y: 1 },
            { x: "Gaming", y: 1 },
            { x: "Sports", y: 1 },
          ],
          name: "Meghalaya",
        },
        {
          data: [
            { x: "Society & Lifestyle", y: 4 },
            { x: "Tech Trends", y: 1 },
            { x: "Entertainment", y: 1 },
            { x: "Lifestyle", y: 1 },
            { x: "Breaking News", y: 1 },
            { x: "Science", y: 1 },
            { x: "Culture", y: 1 },
            { x: "Education & Learning", y: 1 },
            { x: "Gaming", y: 1 },
            { x: "Politics", y: 1 },
            { x: "Food & Cooking", y: 1 },
          ],
          name: "Himachal Pradesh",
        },
        {
          data: [
            { x: "Health", y: 1 },
            { x: "Finance", y: 1 },
            { x: "Gaming", y: 1 },
            { x: "Food & Cooking", y: 1 },
            { x: "Entertainment", y: 1 },
            { x: "Politics", y: 1 },
            { x: "Sports", y: 1 },
            { x: "Technology", y: 1 },
            { x: "Environment", y: 1 },
          ],
          name: "Bihar",
        },
        {
          data: [
            { x: "Politics", y: 1 },
            { x: "Human Interest", y: 1 },
            { x: "Opinion/Editorials", y: 1 },
            { x: "Environment", y: 1 },
            { x: "Tech Trends", y: 2 },
            { x: "Lifestyle", y: 1 },
            { x: "Entertainment", y: 2 },
            { x: "Food & Cooking", y: 1 },
          ],
          name: "Manipur",
        },
        {
          data: [
            { x: "Tech Trends", y: 1 },
            { x: "Weather", y: 1 },
            { x: "Education", y: 1 },
            { x: "Finance", y: 1 },
            { x: "Entertainment", y: 1 },
          ],
          name: "Jharkhand",
        },
        {
          data: [
            { x: "Society & Lifestyle", y: 2 },
            { x: "Gaming", y: 1 },
            { x: "Travel", y: 2 },
            { x: "Technology", y: 2 },
            { x: "Politics", y: 1 },
            { x: "Sports", y: 1 },
          ],
          name: "Rajasthan",
        },
        {
          data: [
            { x: "Finance", y: 1 },
            { x: "Lifestyle", y: 1 },
            { x: "Travel", y: 1 },
            { x: "Politics", y: 1 },
            { x: "Tech Trends", y: 1 },
          ],
          name: "Odisha",
        },
        {
          data: [
            { x: "Sports", y: 1 },
            { x: "Human Interest", y: 1 },
            { x: "Health", y: 1 },
            { x: "Politics", y: 1 },
            { x: "Environment", y: 2 },
          ],
          name: "Goa",
        },
        {
          data: [
            { x: "Tech Trends", y: 3 },
            { x: "Breaking News", y: 2 },
            { x: "Society & Lifestyle", y: 1 },
            { x: "Business", y: 2 },
            { x: "Human Interest", y: 1 },
            { x: "Travel", y: 1 },
            { x: "Health", y: 1 },
            { x: "Technology", y: 1 },
            { x: "Science", y: 1 },
          ],
          name: "West Bengal",
        },
        {
          data: [
            { x: "Health", y: 1 },
            { x: "Weather", y: 1 },
            { x: "Travel", y: 1 },
            { x: "Technology", y: 1 },
            { x: "Business", y: 3 },
            { x: "Sports", y: 2 },
            { x: "Culture", y: 1 },
            { x: "Tech Trends", y: 1 },
            { x: "Lifestyle", y: 1 },
            { x: "Entertainment", y: 1 },
            { x: "Breaking News", y: 2 },
          ],
          name: "Andhra Pradesh",
        },
        {
          data: [
            { x: "Business", y: 1 },
            { x: "Gaming", y: 1 },
            { x: "Lifestyle", y: 1 },
            { x: "Travel", y: 1 },
            { x: "Environment", y: 1 },
            { x: "Food & Cooking", y: 1 },
            { x: "Finance", y: 1 },
            { x: "Culture", y: 1 },
          ],
          name: "Gujarat",
        },
        {
          data: [
            { x: "Entertainment", y: 1 },
            { x: "Science", y: 1 },
            { x: "Opinion/Editorials", y: 1 },
            { x: "Food & Cooking", y: 1 },
            { x: "Environment", y: 1 },
          ],
          name: "Assam",
        },
        {
          data: [
            { x: "Opinion/Editorials", y: 1 },
            { x: "Human Interest", y: 2 },
            { x: "Business", y: 2 },
            { x: "Culture", y: 1 },
            { x: "Society & Lifestyle", y: 1 },
            { x: "Weather", y: 2 },
            { x: "Science", y: 1 },
          ],
          name: "Haryana",
        },
        {
          data: [
            { x: "Business", y: 1 },
            { x: "Opinion/Editorials", y: 1 },
            { x: "Tech Trends", y: 2 },
            { x: "Society & Lifestyle", y: 2 },
            { x: "Environment", y: 1 },
            { x: "Entertainment", y: 2 },
            { x: "Science", y: 1 },
          ],
          name: "Telangana",
        },
        {
          data: [
            { x: "Education", y: 1 },
            { x: "Weather", y: 1 },
            { x: "Science", y: 1 },
            { x: "Lifestyle", y: 1 },
            { x: "Politics", y: 1 },
            { x: "Environment", y: 1 },
            { x: "Entertainment", y: 1 },
            { x: "Society & Lifestyle", y: 1 },
          ],
          name: "Tamil Nadu",
        },
        {
          data: [
            { x: "Entertainment", y: 1 },
            { x: "Culture", y: 1 },
            { x: "Education & Learning", y: 1 },
            { x: "Education", y: 1 },
            { x: "Finance", y: 1 },
            { x: "Society & Lifestyle", y: 1 },
            { x: "Sports", y: 1 },
            { x: "Breaking News", y: 1 },
            { x: "Food & Cooking", y: 1 },
          ],
          name: "Nagaland",
        },
        {
          data: [
            { x: "Politics", y: 1 },
            { x: "Education & Learning", y: 2 },
            { x: "Education", y: 1 },
            { x: "Science", y: 1 },
            { x: "Breaking News", y: 1 },
            { x: "Human Interest", y: 1 },
            { x: "Sports", y: 1 },
          ],
          name: "Sikkim",
        },
        {
          data: [
            { x: "Lifestyle", y: 1 },
            { x: "Education & Learning", y: 1 },
            { x: "Opinion/Editorials", y: 2 },
            { x: "Technology", y: 1 },
            { x: "Tech Trends", y: 1 },
            { x: "Science", y: 1 },
            { x: "Breaking News", y: 1 },
            { x: "Health", y: 1 },
          ],
          name: "Tripura",
        },
        {
          data: [
            { x: "Technology", y: 1 },
            { x: "Culture", y: 1 },
            { x: "Breaking News", y: 1 },
            { x: "Human Interest", y: 1 },
            { x: "Science", y: 1 },
            { x: "Weather", y: 1 },
          ],
          name: "Mizoram",
        },
        {
          data: [
            { x: "Weather", y: 1 },
            { x: "Entertainment", y: 1 },
            { x: "Human Interest", y: 1 },
            { x: "Sports", y: 1 },
          ],
          name: "Uttarakhand",
        },
        {
          data: [
            { x: "Human Interest", y: 1 },
            { x: "Food & Cooking", y: 1 },
            { x: "Finance", y: 1 },
            { x: "Culture", y: 1 },
            { x: "Sports", y: 2 },
            { x: "Tech Trends", y: 2 },
            { x: "Gaming", y: 1 },
            { x: "Entertainment", y: 1 },
          ],
          name: "Punjab",
        },
        {
          data: [
            { x: "Health", y: 2 },
            { x: "Science", y: 2 },
            { x: "Breaking News", y: 1 },
            { x: "Business", y: 1 },
            { x: "Lifestyle", y: 1 },
            { x: "Entertainment", y: 2 },
            { x: "Politics", y: 2 },
            { x: "Tech Trends", y: 1 },
            { x: "Gaming", y: 1 },
          ],
          name: "Madhya Pradesh",
        },
        {
          data: [
            { x: "Business", y: 1 },
            { x: "Culture", y: 2 },
            { x: "Lifestyle", y: 1 },
            { x: "Society & Lifestyle", y: 1 },
            { x: "Breaking News", y: 1 },
          ],
          name: "Maharashtra",
        },
        {
          data: [
            { x: "Lifestyle", y: 1 },
            { x: "Opinion/Editorials", y: 1 },
            { x: "Entertainment", y: 1 },
            { x: "Breaking News", y: 1 },
            { x: "Weather", y: 2 },
            { x: "Politics", y: 1 },
            { x: "Science", y: 1 },
            { x: "Travel", y: 1 },
          ],
          name: "Uttar Pradesh",
        },
        {
          data: [
            { x: "Opinion/Editorials", y: 2 },
            { x: "Breaking News", y: 1 },
            { x: "Environment", y: 1 },
            { x: "Finance", y: 1 },
            { x: "Weather", y: 1 },
            { x: "Education", y: 1 },
          ],
          name: "Karnataka",
        },
      ],
      options: {
        colors: ['#000000'],
        plotOptions: {
          heatmap: {
            enableShades: true,
            distributed: true,
            useFillColorAsStroke: false,
          },
        },
      },
    };
  },
};
</script>

<style scoped></style>
