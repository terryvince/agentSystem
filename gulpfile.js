const config       = require('config');
const fs           = require('fs');
const gulp         = require('gulp');
const del          = require('del');
const {join, extname}       = require('path');
const { exec } = require('child_process');
const chokidar = require('chokidar');
const log          = require('fancy-log');
const ejs          = require('gulp-ejs');
const webpack      = require('webpack');
const browserSync  = require('browser-sync').create();
const {plugins, ...baseConf}  = require('./webpack.config');
const {DllReferencePlugin, DllPlugin} = webpack;
const {src, output, vendors} = config;

const manifest = join(output, 'vendor.manifest.json');
const htmlFile = join(src, '*.?(ejs|html)');

/*自动检测多入口配置*/
(()=>{
  let result=fs.readdirSync(src).filter(fileName=>fileName.lastIndexOf('.js')>-1);
  let entryOb={};
  result=result.map(str=>str.replace('.js',''));
  result.forEach((str)=>{
    if(str!=='main')
    {
      entryOb[str]=join(src,str+'.js');
    }
  });
  Object.assign(config.entry,entryOb);
})();

const bundler = (config, done) => webpack(config, (err, stats) => {
  if(err) return done(err);
  log.info(`[webpack:${config.name}]\n${stats.toString({colors: true, warnings: false})}`);
  return done();
});

gulp.task('clean', () => del(output));

gulp.task('webpack:dll', (done) => !vendors ? done() :
  bundler({
    ...baseConf,
    name: 'dll',
    devtool: 'cheap-module-source-map',
    entry: vendors,
    output: {
      path: output,
      filename: 'vendor.dll.js',
      library: 'vendor_dll_[hash:8]',
    },
    plugins: [
      ...plugins,
      new DllPlugin({
        name: 'vendor_dll_[hash:8]',
        path: manifest,
      }),
    ]
  }, done)
);

gulp.task('webpack:app', (done) => {
  let exists = fs.existsSync(manifest);
  return bundler(exists ? {
    ...baseConf,
    plugins: [
      ...plugins,
      new DllReferencePlugin({
        manifest,
      })
    ]
  } : {...baseConf, plugins}, done);
});

gulp.task('html', () =>
  gulp.src(htmlFile)
    .pipe(ejs({dll: fs.existsSync(manifest), ...config}, {}, {ext: '.html'}))
    .pipe(gulp.dest(output))
);

gulp.task('build', gulp.series('clean', 'webpack:dll', 'webpack:app', 'html'));

gulp.task('serve', (done) => {
  browserSync.init({
    server: [output, src],
  });
  browserSync.watch(output).on('change', browserSync.reload);
  return done();
});

gulp.task('watch', (done) => {
  // 监听目录所有文件改变，不适用windows
  // gulp.watch([join(src, '**/*'), '!' + htmlFile], gulp.series('webpack:app'));
  // gulp.watch(htmlFile, gulp.series('html'));
  // window 下监听文件更改
  chokidar.watch(join(src),{ignored:/tmp/}).on('change', (path) => {
    let ext = extname(path);
    if(ext == '.html'){
      console.log('runing command: gulp html');
      exec('gulp html', (err) => {
        if(err) {
          throw err;
        }
        console.log('finished "html" ');
      });
    } else{
      console.log('runing command: gulp webpack:app');
      exec('gulp webpack:app', (err) => {
        if(err) {
          throw err;
        }
        console.log('finished "webpack:app" ');
      });
    }
  })
  done();
});

gulp.task('default', gulp.series('build', 'serve', 'watch'));

//TODO: test & zip & cdn
//get files path
// function findSync(startPath) {
//   let result=[];
//   function finder(path) {
//     let files=fs.readdirSync(path);
//     files.forEach((val) => {
//       let fPath=join(path,val);
//       let stats=fs.statSync(fPath);
//       if(stats.isDirectory()) finder(fPath);
//       if(stats.isFile()) result.push(fPath);
//     });
//
//   }
//   finder(startPath);
//   return result;
// }
