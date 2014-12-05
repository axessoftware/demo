window.SFA = $.extend(true, window.SFA, {
    "config": {
        "layoutSet": "navbar",
        "navigation": [
          {
              "title": "Acasa",
              "action": function () { SFA.app.navigate("home", { root: true, target: 'current' }); },
              "icon": "home"
          },
          {
              "title": "Nomenclatoare",
              "action": function () { SFA.app.navigate("lists", { root: true, target: 'current' }); },
              "icon": "folder"
          },
          {
              "title": "Vizite",
              "action": function () { SFA.app.navigate("visits", { root: true, target: 'current' }); },
              "icon": "runner"
          },
          {
              "title": "Activitati",
              "action": function () { SFA.app.navigate("activities", { root: true, target: 'current' }); },
              "icon": "todo"
          },
          {
              "title": "Sincronizare",
              "action": function () { SFA.app.navigate("sync", { root: true, target: 'current' }); },
              "icon": "refresh"
          },
          {
              "title": "Setari",
              "action": function () { SFA.app.navigate("preferences", { root: true, target: 'current' }); },
              "icon": "preferences"
          },
          {
              "title": "Informatii",
              "action": function () { SFA.app.navigate("info", { root: true, target: 'current' }); },
              "icon": "info"
          }
        ]
    }
});