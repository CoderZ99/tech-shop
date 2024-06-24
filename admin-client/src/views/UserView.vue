<template>
  <div>
    <div class="w-full flex mb-4">
      <div class="text-2xl font-semibold">Quản lý tài khoản</div>
      <a-button
        class="ml-auto"
        @click="getAllUsers"
        :disabled="loading"
        type="primary"
      >
        Tải lại dữ liệu
      </a-button>
    </div>
    <a-table
      :data-source="pagedUsers"
      rowKey="id"
      bordered
      :loading="loading"
      :pagination="paginationConfig"
      @change="handleTableChange"
    >
      <a-table-column
        key="username"
        title="Tài khoản đăng nhập"
        dataIndex="username"
      />
      <a-table-column
        key="name"
        title="Tên người dùng"
        dataIndex="name"
      />
      <a-table-column
        align="center"
        key="role"
        title="Loại tài khoản"
        dataIndex="role"
      >
        <template #default="{ text: role }">
          <span>
            <a-tag :key="role" color="green">
              Người dùng
            </a-tag>
          </span>
        </template>
      </a-table-column>
      <a-table-column
        align="center"
        key="status"
        title="Trạng thái"
        dataIndex="status"
      >
        <template #default="{ text: status }">
          <span v-if="status === 'active'">
            <a-tag class="min-w-28 text-center" :key="status" color="blue">
              Đang hoạt động
            </a-tag>
          </span>
          <span v-if="status === 'disable'">
            <a-tag class="min-w-28 text-center" :key="status" color="red">
              Đang bị khoá
            </a-tag>
          </span>
        </template>
      </a-table-column>
      <a-table-column
        align="center"
        key="action"
        title="Hành động"
      >
        <template #default="{ record }">
          <a-button
            class="min-w-40"
            size="middle"
            :danger="record.status === 'active'"
            type="primary"
            @click="toggleUserStatus(record)"
          >
            {{
              record.status === "active"
                ? "Khoá tài khoản"
                : "Mở khoá tài khoản"
            }}
          </a-button>
        </template>
      </a-table-column>
    </a-table>
  </div>
</template>

<script setup>
import { blockUser, fetchUsers, unblockUser } from "@/api/userService";
import { message } from "ant-design-vue";
import { onMounted, ref } from "vue";

const users = ref([]);
const pagedUsers = ref([]);
const loading = ref(false);
const paginationConfig = ref({
  current: 1,
  pageSize: 6,
  total: 0,
});

const getAllUsers = async () => {
  loading.value = true;
  try {
    const response = await fetchUsers();
    users.value = response.data.data;
    paginationConfig.value.total = users.value.length;
    message.success("Danh sách người dùng đã được tải");
    setPagedUsers();
  } catch (error) {
    message.error("Không thể tải danh sách người dùng");
  } finally {
    loading.value = false;
  }
};

const setPagedUsers = () => {
  const start = (paginationConfig.value.current - 1) * paginationConfig.value.pageSize;
  const end = start + paginationConfig.value.pageSize;
  pagedUsers.value = users.value.slice(start, end);
};

const handleTableChange = (pagination) => {
  loading.value = true;
  paginationConfig.value = pagination;
  setPagedUsers();
  loading.value = false;
};

const toggleUserStatus = async (user) => {
  try {
    if (user.status === "active") {
      const response = await blockUser(user.username);
      if (!response) {
        message.error("Có lỗi xảy ra");
      } else {
        message.warning(`Tài khoản ${user.username} đang bị khoá`);
        user.status = "disable";
      }
    } else {
      const response = await unblockUser(user.username);
      if (!response) {
        message.error("Có lỗi xảy ra");
      } else {
        message.warning(`Tài khoản ${user.username} đã được mở khóa`);
        user.status = "active";
      }
    }
    setPagedUsers();
  } catch (error) {
    message.error("Có lỗi xảy ra");
  }
};

onMounted(getAllUsers);
</script>


<style scoped>
/* Add any additional styles here */
</style>
