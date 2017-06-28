# Access Services in Kubernetes

Kubernetes supports two primary modes of finding a Service — environment variables and DNS.

## Environment variables

The services in a Kubernetes cluster are discoverable inside other containers via environment variables.

e.g

When a Service is run on a node, the kubelet adds a set of environment variables for each active Service. It supports both Docker links compatible variables and simpler {SVCNAME}_SERVICE_HOST and {SVCNAME}_SERVICE_PORT variables, where the Service name is upper-cased and dashes are converted to underscores.

Our service name is `dcweb-internal-server-svc` and so `DCWEB_INTERNAL_SERVER_SVC_SERVICE_HOST` and `DCWEB_INTERNAL_SERVER_SVC_SERVICE_POR` variables are available to other pods. 

In the pods (**NOTE:** the uesed service must be created before the pod)

```bash
curl http://$DCWEB_INTERNAL_SERVER_SVC_SERVICE_HOST:$DCWEB_INTERNAL_SERVER_SVC_SERVICE_PORT
```

## DNS service

An alternative is to use the cluster's DNS service, if it has been enabled for the cluster. This lets all pods do name resolution of services automatically, based on the Service name.

As of Kubernetes 1.3, DNS is a built-in service launched automatically using the addon manager cluster add-on. A DNS Pod and Service will be scheduled on the cluster, and the kubelets will be configured to tell individual containers to use the DNS Service’s IP to resolve DNS names.

Every Service defined in the cluster (including the DNS server itself) will be assigned a DNS name. By default, a client Pod’s DNS search list will include the Pod’s own namespace and the cluster’s default domain. This is best illustrated by example:

Assume a Service named foo in the Kubernetes namespace bar. A Pod running in namespace bar can look up this service by simply doing a DNS query for foo. A Pod running in namespace quux can look up this service by doing a DNS query for foo.bar.

The Kubernetes cluster DNS server (based off the SkyDNS library) supports forward lookups (A records), service lookups (SRV records) and reverse IP address lookups (PTR records).

**Check kube-dns:**

in nodes or pods

```bash
nslookup dcweb-internal-server-svc.data-cleaning

curl dcweb-internal-server-svc.data-cleaning:8080 
```

The full service address:

```
dcweb-internal-server-svc.data-cleaning.svc.cluster.local
```

