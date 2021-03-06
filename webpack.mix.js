/**
 *    Copyright 2015-2017 ppy Pty. Ltd.
 *
 *    This file is part of osu!web. osu!web is distributed with the hope of
 *    attracting more community contributions to the core ecosystem of osu!.
 *
 *    osu!web is free software: you can redistribute it and/or modify
 *    it under the terms of the Affero GNU General Public License version 3
 *    as published by the Free Software Foundation.
 *
 *    osu!web is distributed WITHOUT ANY WARRANTY; without even the implied
 *    warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 *    See the GNU Affero General Public License for more details.
 *
 *    You should have received a copy of the GNU Affero General Public License
 *    along with osu!web.  If not, see <http://www.gnu.org/licenses/>.
 */

const { mix } = require('laravel-mix');
const path = require('path');

// .js doesn't support globbing by itself, so we need to glob
// and spread the values in.
const glob = require('glob');
let min = '';
if (mix.inProduction()) {
  min = '.min';
}

// relative from root?
const node_root = 'node_modules';

let webpackConfig = {
  resolve: {
    modules: [
      path.resolve(__dirname, 'resources/assets/coffee'),
    ]
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|coffee)$/,
        loader: 'import-glob-loader',
        exclude: /(node_modules)/,
      },
      {
        test: /\.coffee$/,
        use: ['imports-loader?this=>window', 'coffee-loader']
      }
    ]
  }
};

// use polling if watcher is bugged.
if (process.env.WEBPACK_POLL == 1) {
  webpackConfig['watchOptions'] = {
    poll: true
  };
}

mix
.webpackConfig(webpackConfig)
.js([
  'resources/assets/app.js'
], 'js/app.js')
.js([
  ...glob.sync('resources/assets/coffee/react/profile-page/*.coffee'),
  'resources/assets/coffee/react/profile-page.coffee',
], 'js/react/profile-page.js')
.js([
  ...glob.sync('resources/assets/coffee/react/beatmaps/*.coffee'),
  'resources/assets/coffee/react/beatmaps.coffee',
], 'js/react/beatmaps.js')
.js([
  ...glob.sync('resources/assets/coffee/react/status-page/*.coffee'),
  'resources/assets/coffee/react/status-page.coffee',
], 'js/react/status-page.js')
.js([
  ...glob.sync('resources/assets/coffee/react/beatmap-discussions/*.coffee'),
  'resources/assets/coffee/react/beatmap-discussions.coffee',
], 'js/react/beatmap-discussions.js')
.js([
  ...glob.sync('resources/assets/coffee/react/beatmapset-page/*.coffee'),
  'resources/assets/coffee/react/beatmapset-page.coffee',
], 'js/react/beatmapset-page.js')
.js([
  ...glob.sync('resources/assets/coffee/react/mp-history/*.coffee'),
  'resources/assets/coffee/react/mp-history.coffee',
], 'js/react/mp-history.js')
.js([
  'resources/assets/coffee/react/artist-page.coffee',
], 'js/react/artist-page.js')
.js([
  // 'resources/assets/coffee/react/contest/voting/_base-entry-list.coffee',
  ...glob.sync('resources/assets/coffee/react/contest/voting/*.coffee'),
  'resources/assets/coffee/react/contest-voting.coffee',
], 'js/react/contest-voting.js')
.js([
  ...glob.sync('resources/assets/coffee/react/contest/entry/*.coffee'),
  'resources/assets/coffee/react/contest-entry.coffee',
], 'js/react/contest-entry.js')
.copy('node_modules/font-awesome/fonts', 'public/vendor/fonts/font-awesome')
.copy('node_modules/photoswipe/dist/default-skin', 'public/vendor/_photoswipe-default-skin')
.copy('node_modules/timeago/locales', 'public/vendor/js/timeago-locales')
.less('resources/assets/less/app.less', 'public/css')
.scripts([
  'resources/assets/js/ga.js',
  'resources/assets/js/messages.js',
  'resources/assets/js/laroute.js'
], 'public/js/app-deps.js') // FIXME: less dumb name; this needs to be separated -
                            // compiling coffee and then concating together doesn't
                            // work so well when versioning is used with webpack.
.scripts([
  path.join(node_root, 'turbolinks/dist/turbolinks.js'),
  path.join(node_root, 'jquery/dist/jquery' + min + '.js'),
  path.join(node_root, 'jquery-ujs/src/rails.js'),
  path.join(node_root, 'qtip2/dist/jquery.qtip' + min + '.js'),
  path.join(node_root, 'jquery.scrollto/jquery.scrollTo.js'),
  path.join(node_root, 'jquery-ui/ui/data.js'),
  path.join(node_root, 'jquery-ui/ui/scroll-parent.js'),
  path.join(node_root, 'jquery-ui/ui/widget.js'),
  path.join(node_root, 'jquery-ui/ui/widgets/mouse.js'),
  path.join(node_root, 'jquery-ui/ui/widgets/slider.js'),
  path.join(node_root, 'jquery-ui/ui/widgets/sortable.js'),
  path.join(node_root, 'jquery-ui/ui/keycode.js'),
  path.join(node_root, 'timeago/jquery.timeago.js'),
  path.join(node_root, 'blueimp-file-upload/js/jquery.fileupload.js'),
  path.join(node_root, 'bootstrap/dist/js/bootstrap.js'),
  path.join(node_root, 'lodash/lodash.js'),
  path.join(node_root, 'layzr.js/dist/layzr.js'),
  path.join(node_root, 'react/dist/react' + min + '.js'),
  path.join(node_root, 'react-dom-factories/index.js'),
  path.join(node_root, 'react-dom/dist/react-dom' + min + '.js'),
  path.join(node_root, 'photoswipe/dist/photoswipe.js'),
  path.join(node_root, 'photoswipe/dist/photoswipe-ui-default.js'),
  path.join(node_root, 'd3/build/d3' + min + '.js'),
  path.join(node_root, 'moment/moment.js'),
  path.join(node_root, 'js-cookie/src/js.cookie.js'),

  path.join(node_root, 'react-height/build/react-height' + min + '.js'),
  path.join(node_root, 'react-motion/build/react-motion.js'),
  path.join(node_root, 'react-collapse/build/react-collapse' + min + '.js'),
], 'public/js/vendor.js')
.sourceMaps(!mix.inProduction());

if (mix.inProduction()) {
  mix.version();
}
