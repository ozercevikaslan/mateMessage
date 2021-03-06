import { Navigation } from 'react-native-navigation';

export const goAuth = () => {
  return Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Auth.SignIn',
              id: 'Auth.SignIn',
              options: {
                animations: {
                  setStackRoot: {
                    enabled: true
                  }
                }
              }
            }
          }
        ]
      }
    }
  });
};

export const goSignUp = () =>
  Navigation.setRoot({
    root: {
      stack: {
        options: {
          animations: {
            setRoot: {
              alpha: {
                from: 0,
                to: 1,
                duration: 50000,
                interpolation: 'accelerate'
              }
            }
          },
          topBar: {
            visible: false,
            drawBehind: false,
            height: 0
          },
          layout: {
            orientation: ['portrait']
          }
        },
        children: [
          {
            component: {
              name: 'Auth.SignUp'
            }
          }
        ]
      }
    }
  });

export const goHome = () =>
  Navigation.setRoot({
    root: {
      bottomTabs: {
        options: {
          bottomTabs: {
            backgroundColor: '#f1f1f4',
            drawBehind: true,
            animate: true,
            visible: true,
            titleDisplayMode: 'alwaysShow'
          }
        },
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'Home',
                    id: 'Home',
                    options: {
                      topBar: {
                        drawBehind: true,
                        visible: false
                      },
                      bottomTab: {
                        fontSize: 12,
                        text: 'Home',
                        icon: require('./src/assets/icons/home-tab-icon.png')
                      }
                    }
                  }
                }
              ]
            }
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'MateList',
                    id: 'MateList',
                    options: {
                      topBar: {
                        drawBehind: false,
                        searchBar: true,
                        searchBarHiddenWhenScrolling: true,
                        hideNavBarOnFocusSearchBar: true,
                        searchBarPlaceholder: 'Search',
                        title: {
                          text: 'Mates'
                        },
                        largeTitle: {
                          visible: true
                        }
                      },
                      bottomTab: {
                        fontSize: 12,
                        text: 'Mates',
                        icon: require('./src/assets/icons/people-tab-icon.png')
                      }
                    }
                  }
                }
              ]
            }
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'ConversationList',
                    id: 'ConversationTab',
                    options: {
                      topBar: {
                        visible: true,
                        drawBehind: false,
                        title: {
                          text: 'Chats'
                        },
                        largeTitle: {
                          visible: true
                        }
                      },
                      bottomTab: {
                        fontSize: 12,
                        text: 'Chats',
                        icon: require('./src/assets/icons/chats-tab-icon.png')
                      }
                    }
                  }
                }
              ]
            }
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'Settings',
                    id: 'Settings',
                    options: {
                      topBar: {
                        title: {
                          text: 'Settings'
                        },
                        largeTitle: {
                          visible: true
                        }
                      },
                      bottomTab: {
                        fontSize: 12,
                        text: 'Settings',
                        icon: require('./src/assets/icons/settings-tab-icon.png')
                      }
                    }
                  }
                }
              ]
            }
          }
        ]
      }
    }
  });
