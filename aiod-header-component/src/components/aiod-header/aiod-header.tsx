import { Component, Prop, State, h, Host } from '@stencil/core';

@Component({
  tag: 'aiod-header',
  styleUrl: 'aiod-header.css',
  shadow: true,
})
export class AiodHeader {
  @Prop() variant: 'default' | 'dashboard' = 'default';
  @Prop() isLoggedIn: boolean = false;
  @Prop() userName: string = '';
  @Prop() userAvatarUrl: string = 'https://via.placeholder.com/40x40?text=U';
  @Prop() loginUrl: string = '#';
  @Prop() homeUrl: string = '/';

  @State() mainMenu: any[] = [];
  @State() isDarkTheme: boolean = false;

  async componentWillLoad() {
    // Load theme from localStorage
    this.loadTheme();
    
    // Fetch navigation menu only for default variant
    if (this.variant === 'default') {
      await this.fetchNavigationMenu();
    }
  }

  private loadTheme() {
    const savedTheme = localStorage.getItem('aiod-theme');
    this.isDarkTheme = savedTheme === 'dark';
    this.applyTheme();
  }

  private applyTheme() {
    const htmlElement = document.querySelector('html');
    if (htmlElement) {
      if (this.isDarkTheme) {
        htmlElement.classList.add('dark');
      } else {
        htmlElement.classList.remove('dark');
      }
    }
  }

  private toggleTheme = () => {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem('aiod-theme', this.isDarkTheme ? 'dark' : 'light');
    this.applyTheme();
  }

  private async fetchNavigationMenu() {
    try {
      const response = await fetch('https://aiod.eu/wp-json/aiod/v1/navigation');
      const data = await response.json();
      this.mainMenu = data;
    } catch (error) {
      console.error('Error fetching navigation menu:', error);
      this.mainMenu = [];
    }
  }

  private renderMenuItem(item: any) {
    if (item.children && item.children.length > 0) {
      return (
        <li class="menu-item-has-children">
          <a href={item.url}>{item.title}</a>
          <ul class="sub-menu">
            {item.children.map(child => this.renderMenuItem(child))}
          </ul>
        </li>
      );
    }
    return (
      <li>
        <a href={item.url}>{item.title}</a>
      </li>
    );
  }

  render() {
    const headerClass = this.variant === 'dashboard' ? 'header-dashboard' : '';

    return (
      <Host>
        <header class={headerClass} id="header">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="header-nav">
                  <div class="header-nav-logo">
                    {/* Mobile menu toggle for default variant */}
                    {this.variant === 'default' && (
                      <div class="open-mobile-menu">
                        <div class="hamburguer d-lg-none d-xl-none"><span></span></div>
                        <div class="hamburguer-close d-lg-none d-xl-none"><span></span></div>
                      </div>
                    )}

                    {/* Collapse button for dashboard variant */}
                    {this.variant === 'dashboard' && (
                      <div>
                        <div id="collapseButton" class="d-flex d-lg-none">
                          <div class="hamburguer"><span></span></div>
                        </div>
                      </div>
                    )}

                    {/* Logo */}
                    <a href={this.homeUrl}>
                      <img src="/assets/img/logo-white.png" alt="" class="logotipo" />
                      <img src="/assets/img/logo-cinza.png" alt="" class="logotipo-grey d-none" />
                    </a>

                    {/* Desktop collapse button for dashboard */}
                    {this.variant === 'dashboard' && (
                      <div id="collapseButton" class="d-none d-lg-flex">
                        <i class="icon-colapse"></i>
                      </div>
                    )}

                    {/* Mobile search and user buttons */}
                    <a href="https://mylibrary.aiod.eu/" class="btn btn btn-circle btn-circle--blue btn-search ml-5 mr-0 d-flex d-lg-none">
                      <i class="icon-lupa"></i>
                    </a>

                    {/* Mobile user area */}
                    {this.variant === 'dashboard' ? (
                      <div class="user-avatar-button user-avatar d-flex d-lg-none mr-0">
                        <div class="btn btn btn-circle btn-user ml-0 mr-0">
                          <img src="/assets/img/user-image.jpeg" alt="" />
                          <span class="notifications">1</span>
                        </div>
                      </div>
                    ) : (
                      this.isLoggedIn ? (
                        <div class="user-avatar-button user-avatar d-flex d-lg-none mr-0">
                          <div class="btn btn btn-circle btn-user ml-0 mr-0">
                            <img src={this.userAvatarUrl} alt={this.userName} />
                          </div>
                        </div>
                      ) : (
                        <a class="btn btn-success btn-success--white mr-0 d-flex d-lg-none" href={this.loginUrl} title="Log In">
                          Log In
                        </a>
                      )
                    )}
                  </div>

                  {/* Main menu for default variant */}
                  {this.variant === 'default' && this.mainMenu.length > 0 && (
                    <div id="header-items">
                      <ul class="main-menu">
                        {this.mainMenu.map(item => this.renderMenuItem(item))}
                      </ul>
                    </div>
                  )}

                  {/* Right menu area */}
                  <div class="d-flex flex-lg-row menu-right">
                    {/* Search input for dashboard */}
                    {this.variant === 'dashboard' && (
                      <form id="customForm" class="search-input">
                        <div class="form-group">
                          <input type="text" name="name" placeholder="Search..." class="form-control" required />
                        </div>
                      </form>
                    )}

                    {/* Desktop search button */}
                    <a href="https://mylibrary.aiod.eu/" class="btn btn btn-circle btn-circle--blue btn-search ml-2 d-none d-lg-flex">
                      <i class="icon-lupa"></i>
                    </a>

                    {/* Get Started button */}
                    <a href={`${this.homeUrl}get-started/`} class="btn btn-default btn-user d-none d-lg-flex text-nowrap">
                      Get Started
                    </a>

                    {/* Desktop user area */}
                    {this.isLoggedIn ? (
                      <div class="user-avatar-button user-avatar d-none d-lg-flex">
                        <div class="btn btn btn-circle btn-user ml-2">
                          <img src={this.userAvatarUrl} alt={this.userName} />
                        </div>
                        <span>{this.userName}</span>
                      </div>
                    ) : (
                      <a class="btn btn-success btn-success--white mr-5 d-none d-lg-flex text-nowrap" href={this.loginUrl} title="Log In">
                        Log In
                      </a>
                    )}

                    {/* Theme switcher */}
                    <div class="theme-switch-wrapper">
                      <label class="theme-switch" htmlFor="checkbox">
                        <input 
                          type="checkbox" 
                          id="checkbox" 
                          checked={this.isDarkTheme}
                          onChange={this.toggleTheme}
                        />
                        <div class="slider round">
                          <div class="theme-switch-icons"></div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </Host>
    );
  }
}