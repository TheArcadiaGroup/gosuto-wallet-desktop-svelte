# Tokens

At the moment, tokens will take this structure to ensure that they can be read quickly and loaded up onto the app.

```typescript
{
  [publicKey]: IToken[];
  global: IToken[];
}
```

Using the format above ensures that each wallet can quickly access its wallet specific tokens and global tokens will be held in a separate array. the global tokens will never be an empty array as it will always have `CSPR` as the main token of the app. Loading up tokens will now be easier as the different arrays required to be rendered are concatenated in the same array.
