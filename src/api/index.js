

const URL_PRE = '/api'

const Login =URL_PRE +  '/user/login'//登录
const Logout =URL_PRE +  '/user/logout'//退出

const GET_AREA = URL_PRE + '/area/getAll'  //获取所有地区
const UPLOAD_IMG = URL_PRE + '/admin/upload'  //上传图片

//用户管理
const GET_USER_LIST = URL_PRE +'/user/getFormValue' //获取用户列表
const DO_REGESTER = URL_PRE +'/user/register' //注册
const GET_COMPANY =URL_PRE + '/company/getCompany'//获取公司
const GET_DEPTMENT = URL_PRE +'/company/getDepartment/'//根据公司id获取部门
const ADD_COM = URL_PRE +'/company/addCompany'//添加公司
const ADD_DEPART = URL_PRE +'/company/addDepartment'//添加部门
const GET_USER = URL_PRE +'/user/findUserListByCAndD/'//根据公司和部门获取人员

const DEL_C_D = URL_PRE +'/company/del/'//删除公司或部门

//菜单
const GET_MENU_LIST =URL_PRE +'/restaurant/getMenuByResId/'
const ADD_MENU =URL_PRE +'/restaurant/addMenu'
const DEL_MENU =URL_PRE +'/restaurant/delMenu/'

// 景点
const GET_ATTR_LIST =URL_PRE +'/attraction/findAllAttraction'
const ADD_ATTR =URL_PRE +'/attraction/addFormValue'
const DEL_ATTR =URL_PRE +'/attraction/del/'

// 自费活动
const GET_ACT_LIST =URL_PRE +'/optionalActivities/getFormValue'
const ADD_ACT =URL_PRE +'/optionalActivities/addFormValue'
const DEL_ACT =URL_PRE +'/optionalActivities/del/'

// 游轮
const GET_CRU_LIST =URL_PRE +'/cruises/findAllCruises'
const ADD_CRU =URL_PRE +'/cruises/addFormValue'
const DEL_CRU =URL_PRE +'/cruises/del/'

// 餐厅
const GET_RES_LIST =URL_PRE +'/restaurant/getFormValue'
const ADD_RES =URL_PRE +'/restaurant/addFormValue'
const DEL_RES =URL_PRE +'/restaurant/del/'

// 酒店
const GET_HOTEL_LIST =URL_PRE +'/hotel/getFormValue'
const ADD_HOTEL =URL_PRE +'/hotel/addFormValue'
const DEL_HOTEL =URL_PRE +'/hotel/del/'

// 游览车
const GET_CAR_LIST =URL_PRE +'/car/findAllCar'
const ADD_CAR =URL_PRE +'/car/addFormValue'
const DEL_CAR =URL_PRE +'/car/del/'

// 导游
const GET_TOUR_LIST =URL_PRE +'/guide/findAllGuide'
const ADD_TOUR =URL_PRE +'/guide/addFormValue'
const DEL_TOUR =URL_PRE +'/guide/del/'

//公共栏目
const ADD_COMMON =URL_PRE + '/notiBoard/createNoticeBoard'
const GET_LIST =URL_PRE + '/notiBoard/getNoticeBoardList'

export default{

	Login,
	Logout,

	ADD_COMMON,
	GET_LIST,

	GET_AREA,
	UPLOAD_IMG,
	//用户管理
	GET_USER_LIST,
	DO_REGESTER,
	GET_COMPANY,
	GET_DEPTMENT,
	ADD_COM,
	ADD_DEPART,
	GET_USER,
	DEL_C_D,
	//菜单
	GET_MENU_LIST,
	ADD_MENU,
	DEL_MENU,
	//景点 
	GET_ATTR_LIST,
	ADD_ATTR,
	DEL_ATTR,
	//资费活动
	GET_ACT_LIST,
	ADD_ACT,
	DEL_ACT,
	// 游轮
	GET_CRU_LIST,
	ADD_CRU,
	DEL_CRU,
	//餐厅
	GET_RES_LIST,	
	ADD_RES,	
	DEL_RES,
	//酒店
	GET_HOTEL_LIST,
	ADD_HOTEL,
	DEL_HOTEL,
	//游览车
	GET_CAR_LIST,
	ADD_CAR,
	DEL_CAR,
	//导游
	GET_TOUR_LIST,
	ADD_TOUR,
	DEL_TOUR,
}