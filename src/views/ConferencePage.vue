<template>
  <div>
    <el-container>
      <Navigation :activeIndex="'3'">
        <el-main>
          <h3>征稿信息</h3>
          <el-table
            :data="paginatedOngoingConferences"
            style="width: 100%"
            v-loading="loading"
          >
            <el-table-column prop="ccfRank" label="CCF"></el-table-column>
            <el-table-column
              prop="conferenceName"
              label="简称"
            ></el-table-column>
            <el-table-column prop="conferenceLocation" label="全称">
              <template v-slot="scope">
                <router-link :to="'/conference/' + scope.row.conferenceId">{{
                  scope.row.conferenceName
                }}</router-link>
              </template>
            </el-table-column>
            <el-table-column prop="delay" label="延期"></el-table-column>
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
            <el-table-column
              prop="conferenceLocation"
              label="会议地点"
            ></el-table-column>
            <el-table-column
              prop="sessionNumber"
              label="届数"
            ></el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="totalOngoingConferences"
            :page-size="pageSize"
            @current-change="handleOngoingPageChange"
          ></el-pagination>

          <h3>已截止征稿的会议</h3>
          <el-table
            :data="paginatedClosedConferences"
            style="width: 100%"
            v-loading="loading"
          >
            <el-table-column prop="ccfRank" label="CCF"></el-table-column>
            <el-table-column
              prop="conferenceName"
              label="简称"
            ></el-table-column>
            <el-table-column prop="conferenceLocation" label="全称">
              <template v-slot="scope">
                <router-link :to="'/conference/' + scope.row.conferenceId">{{
                  scope.row.conferenceName
                }}</router-link>
              </template>
            </el-table-column>
            <el-table-column prop="delay" label="延期"></el-table-column>
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
            <el-table-column
              prop="conferenceLocation"
              label="会议地点"
            ></el-table-column>
            <el-table-column
              prop="sessionNumber"
              label="届数"
            ></el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="totalClosedConferences"
            :page-size="pageSize"
            @current-change="handleClosedPageChange"
          ></el-pagination>
        </el-main>
      </Navigation>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
import Navigation from "./NavigationComp.vue";

export default {
  name: "ConferencesPage",
  components: {
    Navigation,
  },
  data() {
    return {
      loading: false,
      allConferences: [],
      ongoingConferences: [],
      closedConferences: [],
      paginatedOngoingConferences: [],
      paginatedClosedConferences: [],
      totalOngoingConferences: 0,
      totalClosedConferences: 0,
      pageSize: 5,
    };
  },
  methods: {
    handleOngoingPageChange(page) {
      this.paginatedOngoingConferences = this.getPaginatedData(
        this.ongoingConferences,
        page,
        this.pageSize
      );
    },
    handleClosedPageChange(page) {
      this.paginatedClosedConferences = this.getPaginatedData(
        this.closedConferences,
        page,
        this.pageSize
      );
    },
    getPaginatedData(data, page, pageSize) {
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      return data.slice(start, end);
    },
    async fetchConferences() {
      this.loading = true;
      try {
        const response = await axios.get(
          `http://39.101.184.149:8088/api/confjour/Conference/fuzzy/{}`
        );
        this.allConferences = response.data.data; // 假设数据在data属性中
        const currentTime = Date.now();
        
        this.ongoingConferences = this.allConferences.filter(
          (conf) => new Date(conf.submissionDeadline).getTime() > currentTime
        );
        this.closedConferences = this.allConferences.filter(
          (conf) => new Date(conf.submissionDeadline).getTime() <= currentTime
        );
        this.totalOngoingConferences = this.ongoingConferences.length;
        this.totalClosedConferences = this.closedConferences.length;
        this.paginatedOngoingConferences = this.getPaginatedData(
          this.ongoingConferences,
          1,
          this.pageSize
        );
        this.paginatedClosedConferences = this.getPaginatedData(
          this.closedConferences,
          1,
          this.pageSize
        );
      } catch (error) {
        console.error("Failed to fetch conferences:", error);
      } finally {
        this.loading = false;
      }
    },
  },
  created() {
    this.fetchConferences();
  },
};
</script>

<style scoped>
.el-pagination {
  margin-top: 20px;
}
</style>
