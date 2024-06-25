<template>
  <div>
    <el-container>
      <Navigation :activeIndex="'1'">
        <el-main>
          <h3>正在征稿的会议</h3>
          <el-table :data="conferenceData" style="width: 100%">
            <el-table-column prop="ccf" label="CCF"></el-table-column>
            <el-table-column prop="shortName" label="简称"></el-table-column>
            <el-table-column prop="fullName" label="全称"></el-table-column>
            <el-table-column prop="extended" label="延期"></el-table-column>
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
            <el-table-column prop="location" label="会议地点"></el-table-column>
            <el-table-column prop="edition" label="届数"></el-table-column>
          </el-table>
          <el-button @click="gotoConferences">更多</el-button>

          <h3>正在征稿的期刊</h3>
          <el-table :data="journalData" style="width: 100%">
            <el-table-column prop="ccf" label="CCF"></el-table-column>
            <el-table-column prop="fullName" label="全称"></el-table-column>
            <el-table-column
              prop="specialIssue"
              label="Special Issue"
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
          <el-button @click="gotoJournals">更多</el-button>
        </el-main>
      </Navigation>
    </el-container>
  </div>
</template>

<script>
import Navigation from "./NavigationComp.vue";
export default {
  name: "HomePage",
  components: {
    Navigation,
  },
  data() {
    return {
      searchQuery: "",
      conferenceData: [
        {
          ccf: "A",
          shortName: "ICML",
          fullName: "International Conference on Machine Learning",
          extended: "否",
          submissionDeadline: "2024-07-15",
          notificationDate: "2024-09-01",
          conferenceDate: "2024-10-15",
          location: "New York, USA",
          edition: 38,
        },
        // 更多示例数据...
      ],
      journalData: [
        {
          ccf: "A",
          fullName: "Journal of Machine Learning Research",
          specialIssue: "否",
          submissionDeadline: "2024-08-01",
          impactFactor: 3.5,
          publisher: "MIT Press",
        },
        // 更多示例数据...
      ],
      activeIndex: "1",
    };
  },
  methods: {
    gotoConferences() {
      this.$router.push("/conference");
    },
    gotoJournals() {
      this.$router.push("/journal");
    },
  },
};
</script>

<style scoped>
.search-bar {
  margin-bottom: 20px;
}
</style>