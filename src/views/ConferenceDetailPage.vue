<template>
  <div>
    <h2>会议详情</h2>
    <p><strong>会议名称：</strong>{{ conference.conferenceName }}</p>
    <p><strong>会议地点：</strong>{{ conference.conferenceLocation }}</p>
    <p><strong>会议届数：</strong>{{ conference.sessionNumber }}</p>
    <p><strong>截稿日期：</strong>{{ conference.submissionDeadline }}</p>
    <p><strong>通知日期：</strong>{{ new Date(conference.notificationDate).toLocaleDateString() }}</p>
    <p><strong>会议日期：</strong>{{ new Date(conference.conferenceDate).toLocaleDateString() }}</p>
    <p><strong>CCF等级：</strong>{{ conference.ccfRank }}</p>
    <p><strong>会议链接：</strong><a :href="conference.conferenceUrl" target="_blank">{{ conference.conferenceUrl }}</a></p>
    <p><strong>延期：</strong>{{ conference.delay === 'no' ? '否' : '是' }}</p>
    <p><strong>投稿信息：</strong>{{ conference.submissionInformation }}</p>
    <!-- 其他会议相关内容 -->
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ConferenceDetailPage',
  data() {
    return {
      conference: {},
    };
  },
  methods: {
    async fetchConferenceDetail(id) {
      try {
        const response = await axios.get(`http://39.101.184.149:8088/api/confjour/Conference/${id}`);
        this.conference = response.data.data; // 假设返回的数据在 data.data 中
      } catch (error) {
        console.error('Failed to fetch conference details:', error);
      }
    },
    fetchData() {
      const id = this.$route.params.id;
      this.fetchConferenceDetail(id);
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style scoped>
/* 这里可以添加页面相关的样式 */
</style>