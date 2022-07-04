# Database

This folder represents where your data is stored. It could be a database, the blockchain, or whichever method you choose. For simplicity sake we're just using a JSON file.

The utils exported from the index will try to get a registry via file name (in this case `cryptoregistry`) and return it's contents. You DON'T want to copy that logic verbatim, as it's just there for testing purposes and doesn't do many necessary checks.

The contents on `cryptoregistry.json` represent a registry that has a number of tokens in it. For each token we have it's `id` and it's `owner` (if present).
