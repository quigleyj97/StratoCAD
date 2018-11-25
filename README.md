StratoCAD
=========

## What is this?

Right now it's just an experiment while I play around with Phosphor- I want to
see how all the pieces fit together for creating an app end-to-end, and this is
a weekend project to explore that.

As for what it's *supposed* to be, my idea is for a cloud-based CAD program with
3D printer integration. Something that you can run on a Raspberry Pi next to a 
3D printer, and use for editing, slicing, printing, and management. If it's
extensible, it can be used to supply custom logic (like printer drivers, 3rd
party slicers, pricing, authentication, etc).

It could be useful in shared environments, such as schools and makerspaces,
where computers are a definite guarantee but installing specialized software on
them is not.

## Building

```bash
yarn install
yarn build
yarn run
```
