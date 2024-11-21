/**
 * Validates an array of image files to ensure each file is of a valid type and size.
 *
 * @param {Object} images - An object containing an array of image files to validate.
 * @returns {boolean} Returns true if all images are valid.
 * @throws {Error} Throws an error if any image is not of type JPEG/PNG or exceeds 2MB in size.
 */
export const validateImageType = (images) => {
  const validTypes = new Set(["image/jpeg", "image/png"])
  const maxSize = 2 * 1024 * 1024

  return images.every((file) => {
    const isValidType = validTypes.has(file.type)
    const isValidSize = file.size <= maxSize

    if (!isValidType) {
      throw new Error("Chỉ có thể tải lên tệp JPG/PNG!")
    }

    if (!isValidSize) {
      throw new Error(
        `Hình ảnh phải nhỏ hơn 2MB! Kích thước hiện tại: ${(
          file.size /
          1024 /
          1024
        ).toFixed(2)}MB`
      )
    }

    return true
  })
}
