## Usage of the global css grid

The global grid can be used by adding the following 4 classes to your elements.

- global-grid-nav
- global-grid-left
- global-grid-mid
- global-grid-right

The parent of elements with those classes should be a flex container, that has flex-direction: row; (the default flex direction)

Any one of those columns can be omitted, but all columns except of the mid column have maximum width set, so if mid column is omitted, your flex container might not get filled entirely.

### example

```sveltehtml
<script>
  import Navbar from './Navbar.svelte'
</script>

<div class="flex">
  <div class="global-grid-nav">
    <Navbar />
  </div>
  <div class="global-grid-left">
    <p>This is the left column.</p>
  </div>
  <div class="global-grid-mid">
    <p>The main content of this router.</p>
  </div>
  <div class="global-grid-right">
    <p>This is the right column.</p>
  </div>
</div>
```

another example can be found in `src/routes/profile/swap.svelte`, where all 4 columns are used.
