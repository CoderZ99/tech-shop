<template>
  <div>
    <div class="w-full flex mb-4">
      <div class="text-2xl font-semibold">Quản lý tài khoản</div>
      <a-button
        class="ml-auto"
        @click="getAllUsers(query)"
        :disabled="loading"
        type="primary"
      >
        Tải lại dữ liệu
      </a-button>
    </div>

    <!-- Filter, Search, Sort -->
    <div class="flex justify-center gap-3">
      <!-- Search -->
      <div class="mb-4 flex w-[40%] items-center">
        <a-input-search
          class="flex items-center"
          :allowClear="true"
          v-model:value="query.search"
          placeholder="Nhập username cần tìm..."
          @search="handleQueryChange"
        >
          <template #enterButton>
            <div class="flex items-center">
              <SearchOutlined />
            </div>
          </template>
        </a-input-search>
      </div>
      <!-- Filter brand -->
      <div class="mb-4 flex items-center">
        <div class="mr-2 text-gray-500">Trạng thái</div>
        <a-select
          v-model:value="query.status"
          placeholder="Trạng thái tài khoản"
          style="width: 130px"
          @change="handleQueryChange"
        >
          <a-select-option value="">Tất cả</a-select-option>
          <a-select-option value="active">Đang hoạt động</a-select-option>
          <a-select-option value="disable">Bị khoá</a-select-option>
        </a-select>
      </div>
      <!-- Sort -->
      <div class="mb-4 flex items-center">
        <div class="mr-2 text-gray-500">Sắp xếp</div>
        <a-select
          v-model:value="query.sort"
          placeholder="Sắp xếp"
          style="width: 175px"
          @change="handleQueryChange"
        >
          <!-- <a-select-option value="createdAt:desc">Hàng mới</a-select-option> -->
          <a-select-option value="username:asc"
            >Tên đăng nhập A &rarr; Z</a-select-option
          >
          <a-select-option value="username:desc"
            >Tên đăng nhập Z &rarr; A</a-select-option
          >
        </a-select>
      </div>
    </div>
    <!-- Users Table -->
    <a-table
      :data-source="pagedUsers"
      rowKey="id"
      bordered
      :loading="loading"
      :pagination="false"
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
            <a-tag
              :key="role"
              color="green"
            >
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
            <a-tag
              class="min-w-28 text-center"
              :key="status"
              color="blue"
            >
              Đang hoạt động
            </a-tag>
          </span>
          <span v-if="status === 'disable'">
            <a-tag
              class="min-w-28 text-center"
              :key="status"
              color="red"
            >
              Đang bị khoá
            </a-tag>
          </span>
        </template>
      </a-table-column>
      <a-table-column
        align="center"
        key="action"
        title="Hành động"
        width="315px"
        fixed="right"
      >
        <template #default="{ record }">
          <a-button
            class="min-w-20 mr-2 my-2"
            size="middle"
            type="primary"
            danger
            @click="removeUser(record)"
          >
            Xóa tài khoản
          </a-button>
          <a-button
            class="min-w-25"
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
    <!-- Pagination -->
    <div class="mt-4 flex justify-end">
      <a-pagination
        v-model:current="current"
        v-model:total="total"
        v-model:page-size="pageSize"
        @change="handlePageChange"
        show-less-items
        :showSizeChanger="false"
      />
    </div>
  </div>
</template>

<script setup>
  import {
    blockUser,
    fetchUsers,
    unblockUser,
    deleteUser,
  } from "@/api/userService"
  import { SearchOutlined } from "@ant-design/icons-vue"
  import { message } from "ant-design-vue"
  import { onMounted, ref, reactive, computed } from "vue"

  const users = ref([])
  const loading = ref(false)

  // Default current page is 1
  // Default page size is 5
  const current = ref(1)
  const pageSize = ref(5)
  const total = ref(0)
  const pagedUsers = computed(() => users?.value || [])

  // State for query
  const query = ref({
    search: "",
    status: "",
    sort: "username:asc",
    page: 1,
    limit: 5,
  })

  const getAllUsers = async (query = { page: 1, limit: 5 }) => {
    loading.value = true
    try {
      const response = await fetchUsers(query)
      users.value = []
      users.value = [...response?.data?.users?.docs]
      total.value = response?.data?.users?.totalDocs
    } catch (error) {
      console.log(`🚀 ~ getAllUsers ~ error:${error}`)
      message.error("Có lỗi xảy ra khi tải danh sách người dùng")
    } finally {
      loading.value = false
    }
  }

  const handlePageChange = async (page) => {
    query.value.page = page
    current.value = page
    await getAllUsers(query.value)
  }

  const handleQueryChange = async () => {
    query.value.page = 1
    current.value = 1
    await getAllUsers(query.value)
  }

  const toggleUserStatus = async (user) => {
    try {
      if (user.status === "active") {
        const response = await blockUser(user.username)
        if (!response) {
          message.error("Có lỗi xảy ra")
        } else {
          message.warning(`Đã khoá tài khoản ${user.username}`)
          user.status = "disable"
        }
      } else {
        const response = await unblockUser(user.username)
        if (!response) {
          message.error("Có lỗi xảy ra")
        } else {
          message.warning(`Đã mở khoá Tài khoản ${user.username}`)
          user.status = "active"
        }
      }
    } catch (error) {
      message.error("Có lỗi xảy ra")
    }
  }

  // Delete user
  const removeUser = async (user) => {
    try {
      const response = await deleteUser(user.username)
      if (!response) {
        message.error(`Xoá tài khoản ${user.username} thất bại!`)
      } else {
        message.success(`Xoá tài khoản ${user.username} thành công!`)
        await getAllUsers(query.value)
      }
    } catch (error) {
      message.error(`Có lỗi xảy ra: ${error.message}`)
    }
  }

  // Life cycle
  onMounted(async () => {
    await getAllUsers()
  })
</script>

<style scoped>
  /* Add any additional styles here */
</style>
