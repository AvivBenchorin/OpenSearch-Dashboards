<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [LegacyClusterClient](./kibana-plugin-core-server.legacyclusterclient.md)

## LegacyClusterClient class


<b>Signature:</b>

```typescript
export declare class LegacyClusterClient implements ILegacyClusterClient 
```

## Constructors

|  Constructor | Modifiers | Description |
|  --- | --- | --- |
|  [(constructor)(config, log, getAuthHeaders)](./kibana-plugin-core-server.legacyclusterclient._constructor_.md) |  | Constructs a new instance of the <code>LegacyClusterClient</code> class |

## Properties

|  Property | Modifiers | Type | Description |
|  --- | --- | --- | --- |
|  [callAsInternalUser](./kibana-plugin-core-server.legacyclusterclient.callasinternaluser.md) |  | <code>LegacyAPICaller</code> | Calls specified endpoint with provided clientParams on behalf of the Kibana internal user. See [LegacyAPICaller](./kibana-plugin-core-server.legacyapicaller.md)<!-- -->. |

## Methods

|  Method | Modifiers | Description |
|  --- | --- | --- |
|  [asScoped(request)](./kibana-plugin-core-server.legacyclusterclient.asscoped.md) |  | Creates an instance of [ILegacyScopedClusterClient](./kibana-plugin-core-server.ilegacyscopedclusterclient.md) based on the configuration the current cluster client that exposes additional <code>callAsCurrentUser</code> method scoped to the provided req. Consumers shouldn't worry about closing scoped client instances, these will be automatically closed as soon as the original cluster client isn't needed anymore and closed. |
|  [close()](./kibana-plugin-core-server.legacyclusterclient.close.md) |  | Closes the cluster client. After that client cannot be used and one should create a new client instance to be able to interact with Elasticsearch API. |
