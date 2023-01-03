# relviz

A tool for visualising relationships between people or things easily in a
browser. The result of running the script is an easy to deploy static webpage
that shows the visualisation.

![relviz example](https://user-images.githubusercontent.com/3518142/210435085-0342359e-8bae-45be-9012-5b8e2f5b04b9.png)

## Usage

Make sure `npm` is installed, and run `npm install`.

To generate JS for nodes and vertices run the `excel-to-graph` script.

```sh
npm run excel-to-graph test.xlsx
```

Every sheet name will be used as the label of an edge in a graph. Every sheet
should have cells in the following two column format.

```csv
Node Type 1,Node Type 2
abc,123
xyz,456
```

The header row in each sheet will name the node types so they can be coloured
the same.

After generating the graph file, build the HTML bundle.

```sh
npm run graph-to-html
```

You can open `index.html` in the root of the repository to view the graph in any
decent browser. If you are happy with the results, you can build the HTML and JS
for distribution with the following command.

```sh
npm run pack
```

A `www` directory will be created with the results, and you can copy and paste
the contents to any web server such as nginx to make the graph available to the
public.

## Development

You can watch for changes and continuously build the graph HTML.

```sh
npm run watch-graph-to-html
```

You can lint all of the files in the project with.

```sh
npm run lint
```

Problems that can be fixed will be fixed.
