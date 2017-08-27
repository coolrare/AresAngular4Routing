
export function initSettings() {

  // Themes setup
  var themes = [
    'theme-1',
    'theme-2',
    'theme-3',
    'theme-4',
    'theme-5',
    'theme-6',
    'theme-7',
    'theme-8',
    'theme-9'
  ];

  var body = $('body');
  var header = $('.layout-container > header');
  var sidebar = $('.layout-container > aside');
  var brand = sidebar.find('.sidebar-header');
  var content = $('.layout-container > main');

  // Handler for themes preview
  $('input[name="setting-theme"]:radio').change(function () {
    var index = this.value;
    if (themes[index]) {
      body.removeClass(themeClassname);
      body.addClass(themes[index]);
    }
  });
  // Regular expression for the pattern bg-* to find the background class
  function themeClassname(index, css) {
    var cmatch = css.match(/(^|\s)theme-\S+/g);
    return (cmatch || []).join(' ');
  }


  // Handler for menu links
  $('input[name="headerMenulink"]:radio').change(function () {
    var menulinks = $('.menu-link');
    // remove allowed classses
    menulinks.removeClass('menu-link-slide menu-link-arrow menu-link-close');
    // Add selected
    menulinks.addClass(this.value);
  });

  // Handlers for layout variations
  // var lContainer = $('.layout-container');
  $('#sidebar-showheader').change(function () {
    brand[this.checked ? 'show' : 'hide']();
  });
  var sidebarToolbar = $('.sidebar-toolbar');
  $('#sidebar-showtoolbar').change(function () {
    sidebarToolbar[this.checked ? 'show' : 'hide']();
  });

  $('#sidebar-offcanvas').change(function () {
    body[this.checked ? 'addClass' : 'removeClass']('sidebar-offcanvas');
  });
}

export function sidebarNav() {

  var $sidebarNav = $('.sidebar-nav');
  var $sidebarContent = $('.sidebar-content');

  activate($sidebarNav);

  $sidebarNav.on('click', function (event) {
    var item = getItemElement(event);
    // check click is on a tag
    if (!item) return;

    var ele = $(item),
      liparent = ele.parent()[0];

    var lis = ele.parent().parent().children(); // markup: ul > li > a
    // remove .active from childs
    lis.find('li').removeClass('active');
    // remove .active from siblings ()
    $.each(lis, function (idx, li) {
      if (li !== liparent)
        $(li).removeClass('active');
    });

    var next = ele.next();
    if (next.length && next[0].tagName === 'UL') {
      ele.parent().toggleClass('active');
      event.preventDefault();
    }
  });

  // find the a element in click context
  // doesn't check deeply, asumens two levels only
  function getItemElement(event) {
    var element = event.target,
      parent = element.parentNode;
    if (element.tagName.toLowerCase() === 'a') return element;
    if (parent.tagName.toLowerCase() === 'a') return parent;
    if (parent.parentNode.tagName.toLowerCase() === 'a') return parent.parentNode;
  }

  function activate(sidebar) {
    sidebar.find('a').each(function () {
      var href = $(this).attr('href').replace('#', '');
      if (href !== '' && window.location.href.indexOf(href) >= 0) {
        var item = $(this).parents('li').addClass('active');
        // Animate scrolling to focus active item
        // $sidebarContent.animate({
        //     scrollTop: $sidebarContent.scrollTop() + item.position().top
        // }, 1200);
        return false; // exit foreach
      }
    });
  }

  var layoutContainer = $('.layout-container');
  var $body = $('body');
  // Handler to toggle sidebar visibility on mobile
  $('#sidebar-toggler').click(function (e) {
    e.preventDefault();
    layoutContainer.toggleClass('sidebar-visible');
    // toggle icon state
    $(this).parent().toggleClass('active');
  });
  // Close sidebar when click on backdrop
  $('.sidebar-layout-obfuscator').click(function (e) {
    e.preventDefault();
    layoutContainer.removeClass('sidebar-visible');
    // restore icon
    $('#sidebar-toggler').parent().removeClass('active');
  });

  // Handler to toggle sidebar visibility on desktop
  $('#offcanvas-toggler').click(function (e) {
    e.preventDefault();
    $body.toggleClass('offcanvas-visible');
    // toggle icon state
    $(this).parent().toggleClass('active');
  });

  // remove desktop offcanvas when app changes to mobile
  // so when it returns, the sidebar is shown again
  window.addEventListener('resize', function () {
    if (window.innerWidth < 768) {
      $body.removeClass('offcanvas-visible');
      $('#offcanvas-toggler').parent().addClass('active');
    }
  });

}
