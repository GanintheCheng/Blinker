import { defineStore } from "pinia";
import { ref } from "vue";

// 定义 Store
export const useMemberStore = defineStore(
  "member",
  () => {
    //场景管理list
    const sceneList = ref([
      {
        img: "/static/场景.png",
        text: "新的场景1",
        id: "1",
      },
      {
        img: "/static/场景.png",
        text: "新的场景2",
        id: "2",
      },
      {
        img: "/static/场景.png",
        text: "新的场景3",
        id: "3",
      },
    ]);
    const modifyListName = (id, name) => {
      for (let i = 0; i < sceneList.value.length; i++) {
        if (sceneList.value[i].id == id) {
          sceneList.value[i].text = name;
          return;
        }
      }
    };
    const modifyListImg = (id, img) => {
      for (let i = 0; i < sceneList.value.length; i++) {
        if (sceneList.value[i].id == id) {
          sceneList.value[i].img = img;
          return;
        }
      }
    };

    //主页list
    const indexList = ref([
      {
        img: "/static/主板.png",
        name: "新的设备1",
        state: "离线",
        id: "1",
      },
      {
        img: "/static/主板.png",
        name: "新的设备2",
        state: "离线",
        id: "2",
      },
      {
        img: "/static/主板.png",
        name: "新的设备3",
        state: "离线",
        id: "3",
      },
      {
        img: "/static/主板.png",
        name: "新的设备4",
        state: "离线",
        id: "4",
      },
      {
        img: "/static/主板.png",
        name: "新的设备5",
        state: "离线",
        id: "5",
      },
    ]);
    const addIndexList = (e: { img: string; name: string; state: string }) => {
      for (let i = 0; i < indexList.value.length; i++) {
        if (e.name === indexList.value[i].name) return false;
      }
      indexList.value.push({
        img: e.img,
        name: e.name,
        state: e.state,
        id: new Date() + "",
      });
      return true;
    };
    const deleteIndexList = (id: string) => {
      indexList.value = indexList.value.filter((item) => item.id !== id);
    };
    const getIndexListById = (id) => {
      for (let i = 0; i < indexList.value.length; i++) {
        if (id == indexList.value[i].id) {
          return indexList.value[i];
        }
      }
    };
    const modifyIndexListName = (id, name) => {
      for (let i = 0; i < indexList.value.length; i++) {
        if (indexList.value[i].id == id) {
          indexList.value[i].name = name;
          return;
        }
      }
    };

    //区域管理
    const areaList = ref([]);
    const getAreaListById = (id) => {
      for (let i = 0; i < areaList.value.length; i++) {
        if (id === areaList.value[i].id) {
          let ids = areaList.value[i].items;
          let res = [];
          for (let j = 0; j < ids.length; j++) {
            res.push(getIndexListById(ids[j]));
          }
          return res;
        }
      }
    };
    const getOutAreaListById = (id) => {
      for (let i = 0; i < areaList.value.length; i++) {
        if (id === areaList.value[i].id) {
          let temp = areaList.value[i].items;
          let ids = [];
          indexList.value.forEach((scene) => {
            if (!temp.includes(scene.id)) {
              ids.push(scene.id);
            }
          });
          let res = [];
          for (let j = 0; j < ids.length; j++) {
            res.push(getIndexListById(ids[j]));
          }
          return res;
        }
      }
    };
    const changeAreaListName = (id, name) => {
      for (let i = 0; i < areaList.value.length; i++) {
        if (id === areaList.value[i].id) {
          areaList.value[i].name = name;
          return;
        }
      }
    };
    const trashByIds = (roomId, itemId) => {
      for (let i = 0; i < areaList.value.length; i++) {
        if (areaList.value[i].id == roomId) {
          let index = -1;
          for (let j = 0; j < areaList.value[i].items.length; j++) {
            if (areaList.value[i].items[j] == itemId) {
              index = j;
            }
          }
          if (index != -1) {
            areaList.value[i].items.splice(index, 1);
          }
        }
      }
      // 返回更新后的 areaList
      return areaList.value;
    };
    const plusByIds = (roomId, itemId) => {
      for (let i = 0; i < areaList.value.length; i++) {
        if (areaList.value[i].id == roomId) {
          // console.log(itemId);
          areaList.value[i].items.push(itemId + "");
        }
      }
      console.log(areaList.value);

      // 返回更新后的 areaList
      return areaList.value;
    };

    // 会员信息
    const profile = ref<any>();

    // 保存会员信息，登录时使用
    const setProfile = (val: any) => {
      profile.value = val;
    };

    // 清理会员信息，退出时使用
    const clearProfile = () => {
      profile.value = undefined;
    };

    // 记得 return
    return {
      sceneList,
      profile,
      setProfile,
      clearProfile,
      modifyListName,
      modifyListImg,
      indexList,
      addIndexList,
      deleteIndexList,
      areaList,
      changeAreaListName,
      getAreaListById,
      getOutAreaListById,
      trashByIds,
      plusByIds,
      modifyIndexListName
    };
  },
  // TODO: 持久化
  {
    persist: {
      storage: {
        getItem(key) {
          return uni.getStorageSync(key);
        },
        setItem(key, value) {
          uni.setStorageSync(key, value);
        },
      },
    },
  }
);
