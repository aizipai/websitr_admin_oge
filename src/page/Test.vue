<template>
  <el-tree
  :data="companyData"
  node-key="id"
  :load="loadNode"

  lazy
 :render-content="renderContent"
  @check-change="handleCheckChange">
</el-tree>
</template>

<script>
  export default {
    data() {
      return {
        getCompanyUrl: API_URL['GET_COMPANY'], 
        getDepartmentUrl: API_URL['GET_DEPTMENT'], 
        getUsersUrl: API_URL['GET_USER'], 
        companyData:[],
        // regions: [{
        //   'name': 'region1'
        // }, {
        //   'name': 'region2'
        // }],
        props: {
          // label: 'companyName',
          // children: ''
        },
        count: 1
      };
    },
    methods: {

      append(store, data) {
        store.append({ id: id++, label: 'testtest', children: [] }, data);
      },

      remove(store, data) {
        store.remove(data);
      },

      renderContent(h, { node, data, store }) {
        console.log(node)
        // return (
          // <span>
          //   <span>
          //     <span>{data.label}</span>
          //   </span>
          //   <span style="float: right; margin-right: 20px">
          //     <el-button size="mini" on-click={ () => this.append(store, data) }>Append</el-button>
          //     <el-button size="mini" on-click={ () => this.remove(store, data) }>Delete</el-button>
          //   </span>
          // </span>);
      },

      handleCheckChange(data, checked, indeterminate) {
        console.log(data, checked, indeterminate);
      },
      handleNodeClick(data) {
        console.log(data);
      },
      loadNode(node, resolve) {
        if (node.level === 0) {
          // return resolve([{ name: 'region1' }, { name: 'region2' }]);
        }
        if (node.level > 2) return resolve([]);

        if(node.level===1){
          console.log(node.data.companyId)

          this.doGetDepartmentData(node.data.companyId,resolve)
          
        }else if(node.level == 2){
          console.log(node.data.departmentName)
          console.log(node.data)

          this.doGetUserData(node.data.companyId,node.data.departmentId,resolve)
        }

        // var hasChild;
        // if (node.data.name === 'region1') {
        //   hasChild = true;
        // } else if (node.data.name === 'region2') {
        //   hasChild = false;
        // } else {
        //   hasChild = Math.random() > 0.5;
        // }

        // setTimeout(() => {
        //   var data;
        //   if (hasChild) {
        //     data = [{
        //       name: 'zone' + this.count++
        //     }, {
        //       name: 'zone' + this.count++
        //     }];
        //   } else {
        //     data = [];
        //   }

        //   resolve(data);
        // }, 500);
      },
      doGetCompanyData(){

        this.$axios.get(this.getCompanyUrl).then((res)=>{
          const result = res.data
          if(result.ok){
            this.companyData = result.data

            result.data.forEach(item=>{
              item.label = item.companyName
             })
            typeof callback == 'function' && callback(result.data)
          }else{
            alert('获取公司列表失败')
          }
        })
      },
      doGetDepartmentData(c_id,resolve){

        this.$axios.get(this.getDepartmentUrl+c_id).then((res)=>{
          const result = res.data
          if(result.ok){

             result.data.forEach(item=>{
              item.label = item.departmentName
             })

            resolve(result.data)
          }else{
            alert(result.msg)
          }
        })
      },
      doGetUserData(c_id,d_id,resolve){

        // this.$axios.get(this.getUsersUrl+c_id+'/'+d_id).then((res)=>{
        //   const result = res.data
        //   if(result.ok){

             // result.data.forEach(item=>{
             //  item.label = item.departmentName
             // })
// console.log(result)
            resolve([])
        //   }else{
        //     alert(result.msg)
        //   }
        // })
      }  

    },
    mounted(){
      this.doGetCompanyData()
    }
  };
</script>