export default {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "icon-speedometer",
      badge: {
        variant: "info",
        text: "NEW",
      },
    },
    {
      title: true,
      name: "Components",
      wrapper: {
        element: "",
        attributes: {},
      },
    },
    {
      name: "Election",
      url: "/dashboard/Election",
      icon: "icon-puzzle",
      children: [
        {
          name: "Start Election",
          url: "/dashboard/Election/StartElection",
          icon: "icon-puzzle",
        },
        {
          name: "End Election",
          url: "/dashboard/Election/EndElection",
          icon: "icon-puzzle",
        },

      ],
    },

    {
      name: "Voters",
      url: "/dashboard/voters",
      icon: "fa fa-code",
    },

    {
      name: "Candidates",
      url: "/dashboard/candidates",
      icon: "icon-list",
    },

    {
      name: "Stats",
      url: "/dashboard/analytics",
      icon: "icon-pie-chart",
    },
  ],
};
