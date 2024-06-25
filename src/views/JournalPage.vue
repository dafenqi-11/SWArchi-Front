<template>
  <div>
    <el-container>
      <Navigation :activeIndex="'2'">
        <el-main>
          <h3>期刊信息</h3>
          <el-table :data="journals" style="width: 100%" v-loading="loading">
            <el-table-column prop="ccfRank" label="CCF"></el-table-column>
            <el-table-column prop="journalName" label="全称">
              <template v-slot="scope">
                <router-link :to="'/journal/' + scope.row.journalId">{{
                  scope.row.journalName
                }}</router-link>
              </template>
            </el-table-column>
            <el-table-column
              prop="issn"
              label="国际标准连续出版物号"
            ></el-table-column>
            <el-table-column
              prop="submissionDeadline"
              label="截稿日期"
            ></el-table-column>
            <el-table-column
              prop="impactFactor"
              label="影响因子"
            ></el-table-column>
            <el-table-column prop="publisher" label="出版商"></el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="totalJournals"
            :page-size="pageSize"
            @current-change="handlePageChange"
          ></el-pagination>
        </el-main>
      </Navigation>
    </el-container>
  </div>
</template>

<script>
import Navigation from "./NavigationComp.vue";
import axios from "axios";

export default {
  name: "JournalsPage",
  components: {
    Navigation,
  },
  data() {
    return {
      loading: false,
      journals: [],
      totalJournals: 0,
      pageSize: 20,
      isLoggedIn: false,
    };
  },
  methods: {
    handlePageChange(page) {
      this.fetchJournals(page);
    },
    async fetchJournals(page) {
      this.loading = true;
      try {
        const response = await axios.get(
          "http://39.101.184.149:8088/api/confjour/Journal/fuzzy/{}"
        );
        const journals = response.data.data;

        this.totalJournals = journals.length;
        this.journals = journals.slice(
          (page - 1) * this.pageSize,
          page * this.pageSize
        );
      } catch (error) {
        console.error("Failed to fetch journals:", error);
      } finally {
        this.loading = false;
      }
    },
  },

  created() {
    this.fetchJournals(1);
  },
};
</script>

<style scoped>
.el-pagination {
  margin-top: 20px;
}
</style>
