<template>
  <div>
    <el-container>
      <Navigation :activeIndex="'0'">
        <el-main>
          <h3>期刊搜索结果</h3>
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
              prop="impactFactor"
              label="影响因子"
            ></el-table-column>
            <el-table-column prop="publisher" label="出版商"></el-table-column>
          </el-table>

          <h3>会议搜索结果</h3>
          <el-table :data="conferences" style="width: 100%" v-loading="loading">
            <el-table-column prop="ccfRank" label="CCF"></el-table-column>
            <el-table-column prop="conferenceName" label="简称">
              <template v-slot="scope">
                <router-link :to="'/conference/' + scope.row.conferenceId">{{
                  scope.row.conferenceName
                }}</router-link>
              </template>
            </el-table-column>
            <el-table-column
              prop="conferenceLocation"
              label="会议地点"
            ></el-table-column>
            <el-table-column
              prop="submissionDeadline"
              label="截稿日期"
            ></el-table-column>
            <el-table-column
              prop="notificationDate"
              label="通知日期"
            ></el-table-column>
            <el-table-column
              prop="conferenceDate"
              label="会议日期"
            ></el-table-column>
          </el-table>
        </el-main>
      </Navigation>
    </el-container>
  </div>
</template>
  
  <script>
import axios from "axios";
import Navigation from "./NavigationComp.vue";

export default {
  name: "SearchResultsPage",
  components: {
    Navigation,
  },
  data() {
    return {
      loading: false,
      journals: [],
      conferences: [],
    };
  },
  methods: {
    async fetchSearchResults(query) {
      this.loading = true;
      try {
        const journalResponse = await axios.get(
          `http://39.101.184.149:8088/api/confjour/Journal/fuzzy/{"journalName":"${query}"}`
        );
        const conferenceResponse = await axios.get(
          `http://39.101.184.149:8088/api/confjour/Conference/fuzzy/{"conferenceName":"${query}"}`
        );

        this.journals = journalResponse.data.data;
        this.conferences = conferenceResponse.data.data;
      } catch (error) {
        console.error("Failed to fetch search results:", error);
      } finally {
        this.loading = false;
      }
    },
  },
  watch: {
    "$route.query.q": {
      immediate: true,
      handler(query) {
        if (query) {
          this.fetchSearchResults(query);
        }
      },
    },
  },
};
</script>
  
  <style scoped>
.el-pagination {
  margin-top: 20px;
}
</style>
  