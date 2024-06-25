<template>
  <el-container>
    <Navigation :activeIndex="'6'">
      <el-main>
        <h3>管理会议和期刊</h3>

        <!-- 搜索输入框 -->
        <el-input
          v-model="searchKeyword"
          placeholder="输入会议或期刊名称进行搜索"
          style="width: 300px; margin-bottom: 20px"
          @input="handleSearch"
        ></el-input>

        <!-- 新增会议按钮 -->
        <el-button
          type="primary"
          style="margin-bottom: 10px"
          @click="addDialogVisible = true"
        >
          新增会议
        </el-button>
        
        <!-- 新增期刊按钮 -->
        <el-button
          type="primary"
          style="margin-bottom: 10px"
          @click="addJournalDialogVisible = true"
        >
          新增期刊
        </el-button>

        <!-- 显示搜索结果的表格 -->
        <el-table
          :data="searchedConferences"
          style="width: 100%"
          v-loading="loading"
        >
          <el-table-column
            prop="conferenceName"
            label="会议名称"
          ></el-table-column>
          <el-table-column
            prop="conferenceLocation"
            label="会议地点"
          ></el-table-column>
          <el-table-column
            prop="conferenceDate"
            label="会议日期"
          ></el-table-column>
          <el-table-column label="操作">
            <template v-slot="scope">
              <el-button
                type="primary"
                size="small"
                @click="handleEdit(scope.row)"
              >
                修改
              </el-button>
              <el-button
                type="danger"
                size="small"
                @click="handleDelete(scope.row)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 显示期刊搜索结果的表格 -->
        <el-table
          :data="searchedJournals"
          style="width: 100%"
          v-loading="loading"
        >
          <el-table-column
            prop="journalName"
            label="期刊名称"
          ></el-table-column>
          <el-table-column
            prop="issn"
            label="ISSN"
          ></el-table-column>
          <el-table-column
            prop="publisher"
            label="出版社"
          ></el-table-column>
          <el-table-column label="操作">
            <template v-slot="scope">
              <el-button
                type="primary"
                size="small"
                @click="handleEditJournal(scope.row)"
              >
                修改
              </el-button>
              <el-button
                type="danger"
                size="small"
                @click="handleDeleteJournal(scope.row)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 新增会议对话框 -->
        <el-dialog
          title="新增会议"
          v-model="addDialogVisible"
          width="50%"
          @close="clearAddForm"
        >
          <el-form ref="addForm" :model="addForm" label-width="120px">
            <el-form-item label="会议名称" prop="conferenceName">
              <el-input v-model="addForm.conferenceName"></el-input>
            </el-form-item>
            <el-form-item label="会议地点" prop="conferenceLocation">
              <el-input v-model="addForm.conferenceLocation"></el-input>
            </el-form-item>
            <el-form-item label="会议日期" prop="conferenceDate">
              <el-date-picker
                v-model="addForm.conferenceDate"
                type="date"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="是否延期" prop="delay">
              <el-radio-group v-model="addForm.delay">
                <el-radio label="yes">是</el-radio>
                <el-radio label="no">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="会议场次数" prop="sessionNumber">
              <el-input-number
                v-model="addForm.sessionNumber"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="提交信息" prop="submissionInformation">
              <el-input
                type="textarea"
                v-model="addForm.submissionInformation"
              ></el-input>
            </el-form-item>
            <el-form-item label="CCF等级" prop="ccfRank">
              <el-input v-model="addForm.ccfRank"></el-input>
            </el-form-item>
            <el-form-item label="会议链接" prop="conferenceUrl">
              <el-input v-model="addForm.conferenceUrl"></el-input>
            </el-form-item>
            <el-form-item label="提交截止日期" prop="submissionDeadline">
              <el-date-picker
                v-model="addForm.submissionDeadline"
                type="datetime"
              ></el-date-picker>
            </el-form-item>
          </el-form>

          <template v-slot:footer>
            <el-button @click="addDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="saveConference">保存</el-button>
          </template>
        </el-dialog>

        <!-- 修改会议对话框 -->
        <el-dialog
          title="修改会议"
          v-model="editDialogVisible"
          width="50%"
          @close="clearEditForm"
        >
          <el-form ref="editForm" :model="editForm" label-width="120px">
            <el-form-item label="会议名称" prop="conferenceName">
              <el-input v-model="editForm.conferenceName"></el-input>
            </el-form-item>
            <el-form-item label="会议地点" prop="conferenceLocation">
              <el-input v-model="editForm.conferenceLocation"></el-input>
            </el-form-item>
            <el-form-item label="会议日期" prop="conferenceDate">
              <el-date-picker
                v-model="editForm.conferenceDate"
                type="date"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="是否延期" prop="delay">
              <el-radio-group v-model="editForm.delay">
                <el-radio label="yes">是</el-radio>
                <el-radio label="no">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="会议场次数" prop="sessionNumber">
              <el-input-number
                v-model="editForm.sessionNumber"
                controls-position="right"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="提交信息" prop="submissionInformation">
              <el-input
                type="textarea"
                v-model="editForm.submissionInformation"
              ></el-input>
            </el-form-item>
            <el-form-item label="CCF等级" prop="ccfRank">
              <el-input v-model="editForm.ccfRank"></el-input>
            </el-form-item>
            <el-form-item label="会议链接" prop="conferenceUrl">
              <el-input v-model="editForm.conferenceUrl"></el-input>
            </el-form-item>
            <el-form-item label="提交截止日期" prop="submissionDeadline">
              <el-date-picker
                v-model="editForm.submissionDeadline"
                type="datetime"
              ></el-date-picker>
            </el-form-item>
          </el-form>

          <template v-slot:footer>
            <el-button @click="editDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="updateConference">保存</el-button>
          </template>
        </el-dialog>

        <!-- 新增期刊对话框 -->
        <el-dialog
          title="新增期刊"
          v-model="addJournalDialogVisible"
          width="50%"
          @close="clearAddJournalForm"
        >
          <el-form ref="addJournalForm" :model="addJournalForm" label-width="120px">
            <el-form-item label="期刊名称" prop="journalName">
              <el-input v-model="addJournalForm.journalName"></el-input>
            </el-form-item>
            <el-form-item label="ISSN" prop="issn">
              <el-input v-model="addJournalForm.issn"></el-input>
            </el-form-item>
            <el-form-item label="提交信息" prop="submissionInformation">
              <el-input
                type="textarea"
                v-model="addJournalForm.submissionInformation"
              ></el-input>
            </el-form-item>
            <el-form-item label="影响因子" prop="impactFactor">
              <el-input v-model="addJournalForm.impactFactor"></el-input>
            </el-form-item>
            <el-form-item label="出版社" prop="publisher">
              <el-input v-model="addJournalForm.publisher"></el-input>
            </el-form-item>
            <el-form-item label="specialIssue" prop="specialIssue">
              <el-input
                type="textarea"
                v-model="addJournalForm.specialIssue"
              ></el-input>
            </el-form-item>
            <el-form-item label="期刊链接" prop="journalUrl">
              <el-input v-model="addJournalForm.journalUrl"></el-input>
            </el-form-item>
            <el-form-item label="提交截止日期" prop="submissionDeadline">
              <el-date-picker
                v-model="addJournalForm.submissionDeadline"
                type="datetime"
              ></el-date-picker>
            </el-form-item>
          </el-form>

          <template v-slot:footer>
            <el-button @click="addJournalDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="saveJournal">保存</el-button>
          </template>
        </el-dialog>

        <!-- 修改期刊对话框 -->
        <el-dialog
          title="修改期刊"
          v-model="editJournalDialogVisible"
          width="50%"
          @close="clearEditJournalForm"
        >
          <el-form ref="editJournalForm" :model="editJournalForm" label-width="120px">
            <el-form-item label="期刊名称" prop="journalName">
              <el-input v-model="editJournalForm.journalName"></el-input>
            </el-form-item>
            <el-form-item label="ISSN" prop="issn">
              <el-input v-model="editJournalForm.issn"></el-input>
            </el-form-item>
            <el-form-item label="提交信息" prop="submissionInformation">
              <el-input
                type="textarea"
                v-model="editJournalForm.submissionInformation"
              ></el-input>
            </el-form-item>
            <el-form-item label="影响因子" prop="impactFactor">
              <el-input v-model="editJournalForm.impactFactor"></el-input>
            </el-form-item>
            <el-form-item label="出版社" prop="publisher">
              <el-input v-model="editJournalForm.publisher"></el-input>
            </el-form-item>
            <el-form-item label="特刊" prop="specialIssue">
              <el-input
                type="textarea"
                v-model="editJournalForm.specialIssue"
              ></el-input>
            </el-form-item>
            <el-form-item label="期刊链接" prop="journalUrl">
              <el-input v-model="editJournalForm.journalUrl"></el-input>
            </el-form-item>
            <el-form-item label="提交截止日期" prop="submissionDeadline">
              <el-date-picker
                v-model="editJournalForm.submissionDeadline"
                type="datetime"
              ></el-date-picker>
            </el-form-item>
          </el-form>

          <template v-slot:footer>
            <el-button @click="editJournalDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="updateJournal">保存</el-button>
          </template>
        </el-dialog>
      </el-main>
    </Navigation>
  </el-container>
</template>

<script>
import axios from "axios";
import Navigation from "./NavigationComp.vue";
import dayjs from "dayjs";

export default {
  name: "AdminPage",
  components: {
    Navigation,
  },
  data() {
    return {
      loading: false,
      searchKeyword: "",
      searchedConferences: [],
      searchedJournals: [],
      addDialogVisible: false,
      editDialogVisible: false,
      addJournalDialogVisible: false,
      editJournalDialogVisible: false,
      addForm: {
        conferenceName: "",
        conferenceLocation: "",
        conferenceDate: "",
        delay: "no",
        sessionNumber: 0,
        submissionInformation: "",
        ccfRank: "",
        conferenceUrl: "",
        submissionDeadline: "",
      },
      editForm: {
        conferenceId: "",
        conferenceName: "",
        conferenceLocation: "",
        conferenceDate: "",
        delay: "no",
        sessionNumber: 0,
        submissionInformation: "",
        ccfRank: "",
        conferenceUrl: "",
        submissionDeadline: "",
      },
      addJournalForm: {
        journalName: "",
        issn: "",
        submissionInformation: "",
        impactFactor: "",
        publisher: "",
        ccfRank:"",
        specialIssue: "",
        journalUrl: "",
        submissionDeadline: "",
      },
      editJournalForm: {
        journalId: "",
        journalName: "",
        issn: "",
        submissionInformation: "",
        impactFactor: "",
        publisher: "",
        ccfRank:"",
        specialIssue: "",
        journalUrl: "",
        submissionDeadline: "",
      },
    };
  },
  methods: {
    // 处理搜索输入框输入事件
    handleSearch() {
      if (this.searchKeyword.trim() === "") {
        this.searchedConferences = [];
        this.searchedJournals = [];
        return;
      }
      this.fetchConferences();
      this.fetchJournals();
    },

    async fetchConferences() {
      this.loading = true;
      try {
        const response = await axios.get(
          `http://39.101.184.149:8088/api/confjour/Conference/fuzzy/{"conferenceName":"${this.searchKeyword.trim()}"}`
        );
        this.searchedConferences = response.data.data;
      } catch (error) {
        console.error("获取会议数据失败:", error);
      } finally {
        this.loading = false;
      }
    },

    async fetchJournals() {
      this.loading = true;
      try {
        const response = await axios.get(
          `http://39.101.184.149:8088/api/confjour/Journal/fuzzy/{"journalName":"${this.searchKeyword.trim()}"}`
        );
        this.searchedJournals = response.data.data;
      } catch (error) {
        console.error("获取期刊数据失败:", error);
      } finally {
        this.loading = false;
      }
    },

    // 处理新增会议按钮点击事件
    async saveConference() {
      try {
        const {
          conferenceLocation,
          conferenceName,
          delay,
          sessionNumber,
          submissionInformation,
          conferenceDate,
          ccfRank,
          conferenceUrl,
          submissionDeadline,
        } = this.addForm;

        // 格式化日期字段
        const formattedConferenceDate =
          dayjs(conferenceDate).format("YYYY-MM-DD");
        const formattedSubmissionDeadline = dayjs(submissionDeadline).format(
          "YYYY-MM-DD HH:mm:ss"
        );

        const value = {
          conferenceLocation,
          conferenceName,
          delay,
          sessionNumber,
          submissionInformation,
          conferenceDate: formattedConferenceDate,
          ccfRank,
          conferenceUrl,
          submissionDeadline: formattedSubmissionDeadline,
        };
        const param = encodeURIComponent(JSON.stringify(value));
        console.log(param);

        const url = `http://39.101.184.149:8088/api/confjour/Conference?value=${param}`;
        const response = await axios.post(url, null, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("新增会议成功:", response.data);
        this.addDialogVisible = false;
        this.clearAddForm();
        // 刷新会议列表
        this.fetchConferences();
      } catch (error) {
        console.error("新增会议失败:", error);
        alert("新增会议失败！");
      }
    },

    // 处理修改按钮点击事件
    handleEdit(conference) {
      // 打开修改对话框并填充旧的信息
      this.editForm = { ...conference };
      this.editForm.conferenceDate = dayjs(conference.conferenceDate).toDate();
      this.editForm.submissionDeadline = dayjs(
        conference.submissionDeadline
      ).toDate();
      this.editDialogVisible = true;
    },

    // 处理更新会议按钮点击事件
    async updateConference() {
      try {
        const {
          conferenceId,
          conferenceLocation,
          conferenceName,
          delay,
          sessionNumber,
          submissionInformation,
          conferenceDate,
          ccfRank,
          conferenceUrl,
          submissionDeadline,
        } = this.editForm;

        // 格式化日期字段
        const formattedConferenceDate =
          dayjs(conferenceDate).format("YYYY-MM-DD");
        const formattedSubmissionDeadline = dayjs(submissionDeadline).format(
          "YYYY-MM-DD HH:mm:ss"
        );

        const value = {
          conferenceId,
          conferenceLocation,
          conferenceName,
          delay,
          sessionNumber,
          submissionInformation,
          conferenceDate: formattedConferenceDate,
          ccfRank,
          conferenceUrl,
          submissionDeadline: formattedSubmissionDeadline,
        };
        const param = encodeURIComponent(JSON.stringify(value));
        console.log(param);

        const url = `http://39.101.184.149:8088/api/confjour/Conference?value=${param}&id=${conferenceId}`;
        const response = await axios.put(url, null, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("修改会议成功:", response.data);
        this.editDialogVisible = false;
        this.clearEditForm();
        // 刷新会议列表
        this.fetchConferences();
      } catch (error) {
        console.error("修改会议失败:", error);
        alert("修改会议失败！");
      }
    },

    // 处理删除按钮点击事件
    async handleDelete(conference) {
      try {
        const response = await this.$confirm("确认删除该会议吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });

        if (response === "confirm") {
          const url = `http://39.101.184.149:8088/api/confjour/Conference?id=${conference.conferenceId}`;
          await axios.delete(url);
          console.log("删除会议成功:", conference);
          // 刷新会议列表
          this.fetchConferences();
        }
      } catch (error) {
        console.error("删除会议失败:", error);
        alert("删除会议失败！");
      }
    },

    // 清空新增会议表单
    clearAddForm() {
      this.addForm = {
        conferenceName: "",
        conferenceLocation: "",
        conferenceDate: "",
        delay: "no",
        sessionNumber: 0,
        submissionInformation: "",
        ccfRank: "",
        conferenceUrl: "",
        submissionDeadline: "",
      };
    },

    // 清空修改会议表单
    clearEditForm() {
      this.editForm = {
        conferenceId: "",
        conferenceName: "",
        conferenceLocation: "",
        conferenceDate: "",
        delay: "no",
        sessionNumber: 0,
        submissionInformation: "",
        ccfRank: "",
        conferenceUrl: "",
        submissionDeadline: "",
      };
    },

    // 处理新增期刊按钮点击事件
    async saveJournal() {
      try {
        const {
          journalName,
          issn,
          submissionInformation,
          impactFactor,
          publisher,
          specialIssue,
          journalUrl,
          submissionDeadline,
        } = this.addJournalForm;

        // 格式化日期字段
        const formattedSubmissionDeadline = dayjs(submissionDeadline).format(
          "YYYY-MM-DD HH:mm:ss"
        );

        const value = {
          journalName,
          issn,
          submissionInformation,
          impactFactor,
          publisher,
          specialIssue,
          journalUrl,
          submissionDeadline: formattedSubmissionDeadline,
        };
        const param = encodeURIComponent(JSON.stringify(value));
        console.log(param);

        const url = `http://39.101.184.149:8088/api/confjour/Journal?value=${param}`;
        const response = await axios.post(url, null, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("新增期刊成功:", response.data);
        this.addJournalDialogVisible = false;
        this.clearAddJournalForm();
        // 刷新期刊列表
        this.fetchJournals();
      } catch (error) {
        console.error("新增期刊失败:", error);
        alert("新增期刊失败！");
      }
    },

    // 处理修改期刊按钮点击事件
    handleEditJournal(journal) {
      // 打开修改对话框并填充旧的信息
      this.editJournalForm = { ...journal };
      this.editJournalForm.submissionDeadline = dayjs(
        journal.submissionDeadline
      ).toDate();
      this.editJournalDialogVisible = true;
    },

    // 处理更新期刊按钮点击事件
    async updateJournal() {
      try {
        const {
          journalId,
          journalName,
          issn,
          submissionInformation,
          impactFactor,
          publisher,
          specialIssue,
          journalUrl,
          submissionDeadline,
        } = this.editJournalForm;

        // 格式化日期字段
        const formattedSubmissionDeadline = dayjs(submissionDeadline).format(
          "YYYY-MM-DD HH:mm:ss"
        );

        const value = {
          journalId,
          journalName,
          issn,
          submissionInformation,
          impactFactor,
          publisher,
          specialIssue,
          journalUrl,
          submissionDeadline: formattedSubmissionDeadline,
        };
        const param = encodeURIComponent(JSON.stringify(value));
        console.log(param);

        const url = `http://39.101.184.149:8088/api/confjour/Journal?value=${param}&id=${journalId}`;
        const response = await axios.put(url, null, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("修改期刊成功:", response.data);
        this.editJournalDialogVisible = false;
        this.clearEditJournalForm();
        // 刷新期刊列表
        this.fetchJournals();
      } catch (error) {
        console.error("修改期刊失败:", error);
        alert("修改期刊失败！");
      }
    },

    // 处理删除期刊按钮点击事件
    async handleDeleteJournal(journal) {
      try {
        const response = await this.$confirm("确认删除该期刊吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });

        if (response === "confirm") {
          const url = `http://39.101.184.149:8088/api/confjour/Journal?id=${journal.journalId}`;
          await axios.delete(url);
          console.log("删除期刊成功:", journal);
          // 刷新期刊列表
          this.fetchJournals();
        }
      } catch (error) {
        console.error("删除期刊失败:", error);
        alert("删除期刊失败！");
      }
    },

    // 清空新增期刊表单
    clearAddJournalForm() {
      this.addJournalForm = {
        journalName: "",
        issn: "",
        submissionInformation: "",
        impactFactor: "",
        publisher: "",
        specialIssue: "",
        journalUrl: "",
        submissionDeadline: "",
      };
    },

    // 清空修改期刊表单
    clearEditJournalForm() {
      this.editJournalForm = {
        journalId: "",
        journalName: "",
        issn: "",
        submissionInformation: "",
        impactFactor: "",
        publisher: "",
        specialIssue: "",
        journalUrl: "",
        submissionDeadline: "",
      };
    },
  },
};
</script>

<style scoped>
/* 样式可以根据需要进一步调整 */
</style>
