<template>
  <div>
    <h2>期刊详情</h2>
    <p><strong>期刊名称：</strong>{{ journal.journalName }}</p>
    <p><strong>CCF Rank：</strong>{{ journal.ccfRank }}</p>
    <p><strong>ISSN：</strong>{{ journal.issn }}</p>
    <p><strong>影响因子：</strong>{{ journal.impactFactor }}</p>
    <p><strong>出版商：</strong>{{ journal.publisher }}</p>
    <p><strong>submissionInformation：</strong>{{ journal.submissionInformation }}</p>
    <p><strong>specialIssue：</strong>{{ journal.specialIssue }}</p>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'JournalDetailPage',
  data() {
    return {
      journal: {},
    };
  },
  methods: {
    async fetchJournalDetail(id) {
      try {
        const response = await axios.get(`http://39.101.184.149:8088/api/confjour/Journal/${id}`);
        this.journal = response.data.data;
      } catch (error) {
        console.error('Failed to fetch journal detail:', error);
      }
    },
    fetchData() {
      const id = this.$route.params.id;
      this.fetchJournalDetail(id);
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style scoped>
/* 添加样式使页面美观 */
</style>
