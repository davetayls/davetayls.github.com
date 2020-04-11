---
layout: post
---

Setting up the cluster

I chose to use virtualbox and found that there were some 


Kubernetes Architecture

Today I'm looking at cpu and memory constraints

MiB is a Mebibyte, the binary equivalent to Megabyte ie 1024 pow 2 rather than 1000 pow 2

I didn't know about the binary equiv sizes ie kibibyte, mebibyte, gibibyte

Another kubernetes object type is LimitRange

pressing 'e' in top toggles display of values

you can use the `wc` command to print newline, word and byte counts

```sh
sudo docker ps | wc -l
```

clear pods on a node with drain command

when a node is cordoned it won't accept any pods

