import { createRouter, createWebHistory } from 'vue-router'
// import dashboard from '../views/dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: "/",
      name: "login",
      component: () => import("../components/LogIn.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/Dashboard.vue"),
    },
    {
      path: "/station",
      name: "station",
      component: () => import("../components/PollingStationsComponent.vue"),
    },

       {
      path: "/leadership",
      name: "leadership",
      component: () => import("../components/LeadershipComponent.vue"),
    },

     {
      path: "/region",
      name: "region",
      component: () => import("../components/RegionComponent.vue"),
    },
    {
      path: "/collation",
      name: "collation",
      component: () => import("../components/CollationCenterComponent.vue"),
    },
    {
      path: "/Position",
      name: "Position",
      component: () => import("../views/PositionView.vue"),
    },
     {
      path: "/meeting",
      name: "meeting",
      component: () => import("../views/Meeting.vue"),
    },
    {
      path: "/constituency",
      name: "constituency",
      component: () => import("../components/ConstituencyComponent.vue"),
    },

{
  path: "/members/:id",
  name: "MemberDetails",
  component: () => import("../views/MemberDetailsViewe.vue"),
  props: true,
},
{
  path: "/memberss",
  name: "memberss",
  component: () => import("../views/MembersComponent.vue"),
  props: true,
},
{
  path: "/system-settings",
  name: "Mystem-settings",
  component: () => import("../components/SystemSettingsComponent.vue"),
  props: true,
},
{
  path: "/station-members/:name",
  name: "station-members",
  component: () => import("../components/StationMembersComponent.vue"),
  props: true,
}
  ]
})

export default router
