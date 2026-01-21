# Sharding Plugin

This is a variation of the `@nx/jest` plugin forked off of v20.8.4 which replaces the per-file atomizer logic with sharding that is more suitable for unit tests. It solves the issue of having too many small/short atomized targets stressing the distribution logic.

> Note: For long running targets such as integration/e2e tests, the atomizer is still the recommended way.

## Usage

The plugin is used similarly to `@nx/jest` and takes the same parameters with addition of two sharding related ones:

Example:
```JSON
{
  "plugin": "@sharding-plugin/jest-sharded-plugin/plugin",
  "options": {
    "targetName": "test",
    "ciTargetName": "test-ci",
    "shardingLimit": 10,
    "maxShards": 10
  }
}
```

The generated atomized targets will have name in the format `{ciTargetName}--shard{index}`.

Copy plugin into your workspace and add plugin configuration to `nx.json`'s plugins area.

### `shardingLimit`

This option defines what is the lower threshold / size of the shard. If number of test files is smaller than the `shardingLimit`, the sharding will be skipped and only one target will be created.

With enough test files available for sharing, each shard will contain `shardingLimit` number of files until all files are exhausted.

### `maxShards`

To avoid creating too many shards per project, we can specify the maximum number of allowed shards per project.
When number of files is bigger than `maxShard` * `shardingLimit`, the `shardingLimit` will be ignored and all files will be split into `maxShard` number of shards while ensuring files are equally divided as much as possible.


