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

/**
 * Formats a number by adding dots as thousand separators.
 *
 * @param {number} amount - The amount to be formatted.
 * @return {string} The formatted amount as a string with dots as thousand separators.
 */
export const formatCurrency = (value) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value)
}


export const getStatusLabel = (status) => {
  const statusObj = orderStatuses.find((s) => s.value === status)
  return statusObj ? statusObj.label : status
}

export const getStatusColor = (status) => {
  const colors = {
    placed: "orange",
    processing: "blue",
    shipping: "processing",
    delivered: "green",
    cancelled: "red",
  }
  return colors[status] || "gray"
}

const orderStatuses = [
  { value: "placed", label: "Đã đặt hàng" },
  { value: "processing", label: "Đang xử lý" },
  { value: "shipping", label: "Đang giao hàng" },
  { value: "delivered", label: "Đã hoàn thành" },
  { value: "cancelled", label: "Đã hủy" },
]