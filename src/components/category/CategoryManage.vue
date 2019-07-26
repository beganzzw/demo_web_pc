<template>
  <div v-cloak>
    <!--工具栏-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.id" placeholder="id"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getAll()">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd()">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--Category表内容-->
    <el-table :data="list" style="width: 99%">
      <el-table-column v-if='categoryShow' label="ID"
                       width="auto"
                       sortable>
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类别名称" width="auto" sortable>
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.categoryName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类别值" width="auto" sortable>
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.categoryValue }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="auto" sortable>
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ dateFormat(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人" width="auto" sortable>
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.createUser }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最后修改日期" width="auto" sortable>
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ dateFormat(scope.row.lastUpdateTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最后修改人" width="auto" sortable>
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.lastUpdateUser }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if='categoryShow' label="状态" width="auto" sortable>
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="270">
        <template slot-scope="scope">
          <el-button size="small" icon="el-icon-search" circle @click="handleSearch(scope.row) ">查询
          </el-button>
          <el-button size="small" icon="el-icon-edit" circle @click="handleEdit(scope.$index, scope.row) ">编辑
          </el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.row.id, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--Category编辑界面-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" ref="editForm">
        <el-form-item v-if='categoryShow' label="ID" prop="id">
          <el-input v-model="editForm.id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="类别名称">
          <el-input v-model="editForm.categoryName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="类别值">
          <el-input v-model="editForm.categoryValue" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item  v-if='categoryShow' label="创建时间">
          <!--<el-date-picker-->
          <!--v-model="editForm.createTime"-->
          <!--type="date"-->
          <!--format="yyyy 年 MM 月 dd 日 hh 小时 mm分钟 ss秒"-->
          <!--value-format="yyyy-MM-dd hh:mm:ss"-->
          <!--placeholder="创建时间">-->
          <!--</el-date-picker>-->
          <el-input type="date" v-model="editForm.createTime" placeholder="创建时间"></el-input>
        </el-form-item>
        <!--<el-form-item>-->
        <!--<el-input type="date" v-model="editForm.createTime" placeholder="创建时间"></el-input>-->
        <!--</el-form-item>-->

        <el-form-item v-if='categoryShow' label="创建人">
          <el-input v-model="editForm.createUser" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item  v-if='categoryShow' label="最后修改日期">
          <!--<el-date-picker-->
          <!--v-model="editForm.lastUpdateTime"-->
          <!--type="date"-->
          <!--format="yyyy 年 MM 月 dd 日 hh 小时 mm分钟 ss秒"-->
          <!--value-format="yyyy-MM-dd hh:mm:ss"-->
          <!--placeholder="最后修改日期">-->
          <!--</el-date-picker>-->
          <el-input type="date" v-model="editForm.lastUpdateTime" placeholder="最后修改日期"></el-input>
        </el-form-item>
        <el-form-item v-if='categoryShow' label="最后修改人">
          <el-input v-model="editForm.lastUpdateUser" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item  v-if='categoryShow' label="状态">
          <el-input v-model="editForm.status" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="dialogFormVisible=false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确定</el-button>
        <el-button v-else-if="dialogStatus=='update'" type="primary" @click="updateData">确定</el-button>
      </div>
    </el-dialog>

    <!--CategoryItem子类数据-->
    <el-dialog :title="itemMap[dialogStatus]" :visible.sync="itemdialogFormVisible" :close-on-click-modal="false"
               width="auto">
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="editForm">
          <el-form-item>
            <el-input v-model="editForm.id" placeholder="id"></el-input>
          </el-form-item>
          <el-form-item>
            <!--<el-button type="primary" v-on:click="getAll()">查询</el-button>-->
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="itemleAdd(editForm)">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-table :data="seacrhForm" style="width: 99%">
        <el-table-column v-if='categoryShow'
                         label="ID"
                         width="auto">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if='categoryShow' label="大类别ID" width="auto">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.categoryId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="小类别名称" width="auto">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.itemName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="小类别值" width="auto">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.itemValue }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if='categoryShow' label="小类别ORDER" width="auto">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.$index }}</span>
          </template>
        </el-table-column>

        <el-table-column label="创建时间" width="auto">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ dateFormat(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if='categoryShow' label="创建人" width="auto">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.createUser }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最后修改日期" width="auto">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ dateFormat(scope.row.lastUpdateTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if='categoryShow' label="最后修改人" width="auto">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.lastUpdateUser }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if='categoryShow' label="状态" width="auto">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.status }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="270">
          <template slot-scope="scope">
            <el-button size="small" icon="el-icon-edit" circle @click="itemleEdit(scope.$index, scope.row) ">编辑
            </el-button>
            <el-button type="danger" icon="el-icon-delete" circle
                       @click="itemDelete(scope.row.id, scope.row.categoryId)">删除
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="排序">
          <template slot-scope="scope">
            <el-button size="mini" type='text' @click.prevent="sortUp(scope.$index, scope.row)">向上↑</el-button>
            <el-button size="mini" type='text' @click.prevent="sortDown(scope.$index, scope.row)">向下↓</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!--CategoryItem子类编辑页面-->
    <el-dialog :title="itemMap[dialogStatus]" :visible.sync="categoryItemDialogFormVisible"
               :close-on-click-modal="false">
      <el-form :model="categoryItemForm" label-width="80px" ref="categoryItemForm">
        <el-form-item v-if='categoryShow' disabled="false" label="小类ID" prop="id">
          <el-input v-model="categoryItemForm.id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item v-if='categoryShow' label="大类ID" prop="id">
          <el-input v-model="categoryItemForm.categoryId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="小类别名称">
          <el-input v-model="categoryItemForm.itemName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="小类别值">
          <el-input v-model="categoryItemForm.itemValue" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item v-if='categoryShow' label="小类别Order">
          <el-input v-model="categoryItemForm.itemOrder" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item v-if='categoryShow' label="创建时间">
          <el-input type="date" v-model="categoryItemForm.createTime" placeholder="创建时间"></el-input>
        </el-form-item>
        <el-form-item v-if='categoryShow' label="创建人">
          <el-input v-model="categoryItemForm.createUser" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item v-if='categoryShow' label="最后修改日期">
          <el-input type="date" v-model="categoryItemForm.lastUpdateTime" placeholder="最后修改日期"></el-input>
        </el-form-item>
        <el-form-item v-if='categoryShow' label="最后修改人">
          <el-input v-model="categoryItemForm.lastUpdateUser" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item v-if='categoryShow' label="状态">
          <el-input v-model="categoryItemForm.status" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="categoryItemDialogFormVisible=false">取消</el-button>
        <el-button v-if="dialogStatus=='itemcreate'" type="primary" @click="itemCreateData">确定</el-button>
        <el-button v-else-if="dialogStatus=='itemupdate'" type="primary" @click="itemUpdateData">确定</el-button>
      </div>
    </el-dialog>
  </div>


</template>

<script>

  export default {
    data() {
      return {
        formLabelWidth: '120px',
        dialogTableVisible: false,
        dialogFormVisible: false,
        itemdialogFormVisible: false,
        //显示页面
        categoryShow: false,
        //编辑页面
        show: false,

        // 子类编辑页面
        categoryItemDialogFormVisible: false,
        dialogStatus: "",
        filters: {
          id: null,
        },
        textMap: {
          update: "Edit",
          create: "Create",
          search: "Search"

        },
        itemMap: {
          itemupdate: "itemUpdate",
          itemcreate: "itemCreate"
        },
        list: [{
          categoryName: '',
          categoryValue: '',
          createTime: '',
          createUser: '',
          id: '',
          lastUpdateTime: '',
          lastUpdateUser: '',
          status: ''
        }],
        editForm: [{
          categoryName: '',
          categoryValue: '',
          createTime: '',
          createUser: '',
          id: '',
          lastUpdateTime: '',
          lastUpdateUser: '',
          status: ''
        }],
        seacrhForm: [{
          id: '',
          categoryId: '',
          itemValue: '',
          itemName: '',
          itemOrder: '',
          status: '',
          createTime: '',
          createUser: '',
          lastUpdateTime: '',
          lastUpdateUser: ''
        }],
        categoryItemForm: [{
          id: '',
          categoryId: '',
          itemValue: '',
          itemName: '',
          itemOrder: '',
          status: '',
          createTime: '',
          createUser: '',
          lastUpdateTime: '',
          lastUpdateUser: ''
        }],
      }
    },
    created() {
      //获取url
      if (this.utils.getURLParams(location.search).ssoShowLogin) {
        this.loginShow = this.utils.getURLParams(location.search).ssoShowLogin;
      }
      this.$http.post('/user/category.do'
        , {
          "username": this.username,
          "password": this.password
        }).then((response) => {
        this.list = response.data;
      }, (response) => {
      });
    },
    methods: {
      getAll() {
        {
          this.$http.post('/user/category.do'
            , {
              "username": '',
              "password": ''
            }).then((response) => {
            this.list = response.data;

          }, (response) => {
          });
        }
      },
      //新增页面
      handleAdd() {
        this.dialogStatus = "create";
        this.show = true;
        this.dialogFormVisible = true;
        this.editForm = {
          categoryName: '',
          categoryValue: '',
          createTime: '',
          createUser: '',
          id: '',
          lastUpdateTime: '',
          lastUpdateUser: '',
          status: '',
        }
      },
      handleSearch(row) {
        this.dialogStatus = "search";
        this.itemdialogFormVisible = true;
        let editForm = row.id;

        this.$http.post('/user/categoryitem/search.do'
          , {
            "id": editForm
          }).then((response) => {
          this.seacrhForm = response.data;
        }, (response) => {
          // this.list = response.data;
        });

      },
      // itemSearch(categoryId) {
      //   this.dialogStatus = "search";
      //   this.itemdialogFormVisible = true;
      //   this.$http.post('/user/categoryitem/select'
      //     , {
      //       "categoryId": categoryId
      //     }).then((response) => {
      //     this.seacrhForm = response.data;
      //   }, (response) => {
      //     // this.list = response.data;
      //   });
      //
      // },
      // 打开编辑页面
      handleEdit(index, row) {
        this.dialogStatus = "update";
        this.show = false;
        this.dialogFormVisible = true;
        this.editForm = Object.assign({}, row);
      },
      handleDelete(id, row) {
        this.$http.post('/user/category/delete.do'
          , {
            "id": id
          }).then((response) => {
          this.list = response.data;
          // console.log(this.row);
        }, (response) => {
          // this.list = response.data;
        });
      },
      itemleEdit(index, row) {
        this.dialogStatus = "itemupdate";
        this.show = false;
        this.categoryItemDialogFormVisible = true;
        this.categoryItemForm = Object.assign({}, row);
      },
      itemleAdd(row) {
        this.dialogStatus = "itemcreate";
        this.show = true;
        this.categoryItemDialogFormVisible = true;
        this.seacrhForm = Object.assign({}, row);
      },
      itemDelete(id, categoryId) {
        this.$http.post('/user/categoryitem/delete.do'
          , {
            "id": id,
            "categoryId": categoryId
          }).then((response) => {
          let seacrhForm = response.data;
          this.seacrhForm = seacrhForm;
          // itemSearch(seacrhForm[0].categoryId);
        }, (response) => {
          // this.list = response.data;
        });
      },
      createData: function () {
        this.$refs.editForm.validate(valid => {
          if (valid) {
            this.$confirm("确认提交吗？", "提示", {})
              .then(() => {
                let para = Object.assign({}, this.editForm);
                this.$http.post('/user/category/add.do'
                  , {
                    "categoryName": para.categoryName,
                    "categoryValue": para.categoryValue,
                    "createTime": this.dateFormat(para.createTime),
                    "createUser": para.createUser,
                    "id": para.id,
                    "lastUpdateTime": this.dateFormat(para.lastUpdateTime),
                    "lastUpdateUser": para.lastUpdateUser,
                    "status": para.status,
                  }).then((response) => {
                  this.list = response.data;
                  // console.log(this.row);
                }, (response) => {
                  // this.list = response.data;
                });
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.dialogFormVisible = false;
                this.show = false;
                //this.addFormVisible = false;
                this.getAll();
              })
              .catch(e => {
                // 打印一下错误
                console.log(e);
              });
          }
        });
      },
      updateData: function () {
        this.$refs.editForm.validate(valid => {
          if (valid) {
            this.$confirm("确认提交吗？", "提示", {})
              .then(() => {
                let para = Object.assign({}, this.editForm);
                this.$http.post('/user/category/update.do'
                  , {
                    "categoryName": para.categoryName,
                    "categoryValue": para.categoryValue,
                    "createTime": this.dateFormat(para.createTime),
                    "createUser": para.createUser,
                    "id": para.id,
                    "lastUpdateTime": this.dateFormat(para.lastUpdateTime),
                    "lastUpdateUser": para.lastUpdateUser,
                    "status": para.status,
                  }).then((response) => {
                  this.list = response.data;
                }, (response) => {
                  // this.list = response.data;
                });
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.dialogFormVisible = false;
                //this.addFormVisible = false;
                this.getAll();
              })
              .catch(e => {
                // 打印一下错误
                console.log(e);
              });
          }
        });
      },
      searchData: function () {
        this.$refs.editForm.validate(valid => {
          if (valid) {
            this.$confirm("确认提交吗？", "提示", {})
              .then(() => {
                let para = Object.assign({}, this.editForm);

                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.itemdialogFormVisible = false;
              })
              .catch(e => {
                // 打印一下错误
                console.log(e);
              });
          }
        });
      },
      itemUpdateData: function () {
        this.$refs.categoryItemForm.validate(valid => {
          if (valid) {
            this.$confirm("确认提交吗？", "提示", {})
              .then(() => {
                let para = Object.assign({}, this.categoryItemForm);
                this.$http.post('/user/categoryitem/update.do'
                  , {
                    "id": para.id,
                    "categoryId": para.categoryId,
                    "itemValue": para.itemValue,
                    "itemName": para.itemName,
                    "itemOrder": para.itemOrder,
                    "status": para.status,
                    "createTime": this.dateFormat(para.createTime),
                    "createUser": para.createUser,
                    "lastUpdateTime": this.dateFormat(para.lastUpdateTime),
                    "lastUpdateUser": para.lastUpdateUser,
                  }).then((response) => {
                  // this.categoryItemForm = response.data;
                }, (response) => {
                });
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.categoryItemDialogFormVisible = false;
                // this.categoryItemForm = response.data;
                this.itemdialogFormVisible = false;

              })
              .catch(e => {
                // 打印一下错误
                console.log(e);
              });
          }
        });
      },
      itemCreateData: function () {
        this.$refs.categoryItemForm.validate(valid => {
          if (valid) {
            this.$confirm("确认提交吗？", "提示", {})
              .then(() => {
                let para = Object.assign({}, this.categoryItemForm);
                this.$http.post('/user/categoryitem/add.do'
                  , {
                    "categoryId": para[0].categoryId,
                    "itemValue": para.itemValue,
                    "itemName": para.itemName,
                  }).then((response) => {
                  // this.categoryItemForm = response.data;
                }, (response) => {
                });
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.categoryItemDialogFormVisible = false;
                this.itemdialogFormVisible = false;
              })
              .catch(e => {
                // 打印一下错误
                console.log(e);
              });
          }
        });
      },
      dateFormat: function (time) {
        var date = new Date(time);
        var year = date.getFullYear();
        /* 在日期格式中，月份是从0开始的，因此要加0
         * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
         * */
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        // 拼接
        return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
      },
      sortUp(index, row) {
        if (index === 0) {
          this.$message({
            message: '已经是列表中第一个！',
            type: 'warning'
          })
        } else {
          var len = index
          let temp = this.seacrhForm[index - 1]
          this.$http.post('/user/categoryitem/update.do'
            , {
              "id": temp.id,
              "categoryId": temp.categoryId,
              "itemValue": temp.itemValue,
              "itemName": temp.itemName,
              "itemOrder": len,
              "status": temp.status,
              "createTime": this.dateFormat(temp.createTime),
              "createUser": temp.createUser,
              "lastUpdateTime": this.dateFormat(temp.lastUpdateTime),
              "lastUpdateUser": temp.lastUpdateUser,
            }).then((response) => {
            this.categoryItemForm = response.data;
          }, (response) => {
          });
          this.$set(this.seacrhForm, index - 1, this.seacrhForm[index])
          this.$set(this.seacrhForm, index, temp)
        }
      },// 下移按钮
      sortDown(index, row) {
        if (index === (this.seacrhForm.length - 1)) {
          this.$message({
            message: '已经是列表中最后一个！',
            type: 'warning'
          })
        } else {
          var len = index
          let i = this.seacrhForm[index + 1]
          this.$http.post('/user/categoryitem/update.do'
            , {
              "id": i.id,
              "categoryId": i.categoryId,
              "itemValue": i.itemValue,
              "itemName": i.itemName,
              "itemOrder": len,
              "status": i.status,
              "createTime": this.dateFormat(i.createTime),
              "createUser": i.createUser,
              "lastUpdateTime": this.dateFormat(i.lastUpdateTime),
              "lastUpdateUser": i.lastUpdateUser,
            }).then((response) => {
            this.categoryItemForm = response.data;
          }, (response) => {
          });
          this.$set(this.seacrhForm, index + 1, this.seacrhForm[index])
          this.$set(this.seacrhForm, index, i)
        }
      }
    }
  }

</script>

<style lang="less" scoped>
  [v-cloak] {
    display: none
  }
</style>
