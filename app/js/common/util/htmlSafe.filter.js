'use strict';

/*
  This is an example of defining filters for the application. 
  This file is automatically included with the index.js in the same directory
*/
function HTMLSafeFilter($sce) {
  'ngInject';

  return function(htmlCode) {
    return $sce.trustAsHtml(htmlCode);
  };

}

function ResourceUrlSafeFilter($sce) {
  'ngInject';

  return function(htmlCode) {
    return $sce.trustAsResourceUrl(htmlCode);
  };

}

export default [
{
  name: 'htmlSafe',
  fn: HTMLSafeFilter
},
{
  name: 'srcSafe',
  fn: ResourceUrlSafeFilter
}
];