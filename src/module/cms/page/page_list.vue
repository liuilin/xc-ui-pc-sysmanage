<template>
  <div>
    <!--    查询表单-->
    <el-select v-model="params.siteId" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.siteId"
        :label="item.siteName"
        :value="item.siteId">
      </el-option>
    </el-select>
    页面别名：
    <el-input v-model="params.pageAliase" placeholder="请输入页面别名" style="width: 140px"></el-input>
    <el-button type="primary" size="small" v-on:click="handleCurrentChange">查询</el-button>
    <!--    将vue数据对象的siteId和当前页传到page_add里面，给返回按钮用-->
    <router-link :to="{path:'/cms/page/add/',query:{
    page:this.params.page,
    siteId:this.params.siteId
    }}">
      <el-button type="primary" size="small">页面添加</el-button>
    </router-link>
    <el-table
      :data="list"
      stripe
      style="width: 100%">
      >
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="pageName" label="页面名称" width="180">
      </el-table-column>
      <el-table-column prop="pageAliase" label="别名" width="120">
      </el-table-column>
      <el-table-column prop="pageType" label="页面类型" width="120">
      </el-table-column>
      <el-table-column prop="pageWebPath" label="访问路径" width="250">
      </el-table-column>
      <el-table-column prop="pagePhysicalPath" label="物理路径" width="350">
      </el-table-column>
      <!--      <el-table-column prop="pageCreateTime" label="创建时间" width="180">-->
      <!--      </el-table-column>-->
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="preview(scope.row.pageId)" type="text" size="small">预览</el-button>
          <el-button @click="handleEdit(scope.row.pageId)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDel(scope.row.pageId)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :total="total"
      :current-page="params.page"
      style="float: right"
    >
    </el-pagination>
  </div>
</template>

<script>
    import * as cmsApi from '../api/cms'

    export default {
        data() {
            return {
                options: [],
                list: [],
                total: 0,
                params: {
                    page: 1,
                    size: 10,
                    siteId: '',
                    pageAliase: ''
                }
            }
        },
        methods: {
            //分页查询，接收页码
            handleCurrentChange: function (page) {
                this.params.page = page
                this.query()
            },
            query: function () {
                cmsApi.page_list(this.params.page, this.params.size, this.params).then((res) => {
                    console.log('res', res);
                    this.list = res.queryResult.list;
                    this.total = res.queryResult.total
                })
            },
            handleEdit: function (pageId) {
                this.$router.push({
                    path: '/cms/page/edit/' + pageId,
                    // query: {pageId}
                })
            },
            handleDel: function (pageId) {
                this.$confirm('确认删除页面吗', '提示', {}).then(() => {
                    cmsApi.page_del(pageId).then((res) => {
                        if (res.success) {
                            this.$message.success('删除成功');
                            this.query();
                        } else {
                            this.$message.error('删除失败')
                        }
                    })
                });
            },
            preview: function (pageId) {
                window.open("http://www.xuecheng.com/cms/preview/preview/" + pageId);
            }
        },
        //页面渲染前执行，在钩子方法执行查询前，先把page和siteId设置上，这样就能回显并查询
        created() {
            //路由地址取的参数时字符串
            this.params.page = Number.parseInt(this.$route.query.page) || 1;
            this.params.siteId = this.$route.query.siteId
        },
        //页面渲染后执行
        mounted() {
            this.query();
            this.options = [
                {
                    siteId: "5a751fab6abb5044e0d19ea1",
                    siteName: "门户主站"
                }
            ]
        }
    }
</script>


<style scoped>

</style>
