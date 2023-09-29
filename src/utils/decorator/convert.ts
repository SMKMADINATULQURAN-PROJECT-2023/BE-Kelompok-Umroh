class Convert {
  toSlug(v) {
    return slug(
      `${v}-${crypto.randomInt(0, 100000)}-${crypto.randomBytes(40)}`,
    );
  }
}
