Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_skeleton = require('./src/skeleton.js');
const require_skeleton_item = require('./src/skeleton-item.js');
const require_skeleton_item$1 = require('./src/skeleton-item2.js');
const require_skeleton$1 = require('./src/skeleton2.js');

//#region ../../packages/components/skeleton/index.ts
const ElSkeleton = require_install.withInstall(require_skeleton$1.default, { SkeletonItem: require_skeleton_item$1.default });
const ElSkeletonItem = require_install.withNoopInstall(require_skeleton_item$1.default);

//#endregion
exports.ElSkeleton = ElSkeleton;
exports.default = ElSkeleton;
exports.ElSkeletonItem = ElSkeletonItem;
exports.skeletonItemProps = require_skeleton_item.skeletonItemProps;
exports.skeletonProps = require_skeleton.skeletonProps;
//# sourceMappingURL=index.js.map