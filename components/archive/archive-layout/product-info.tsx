interface ProductInfoProps {
  item: {
    id: string
    sku: string
    name: string
    type: "analysis" | "description" | "both"
  }
  isMobile: boolean
}

export function ProductInfo({ item, isMobile }: ProductInfoProps) {
  // Функция для определения статуса элемента
  const getItemStatus = (item: any) => {
    if (item.type === "both") {
      return "Анализ и описание выполнены"
    } else if (item.type === "analysis") {
      return "Анализ выполнен"
    } else {
      return "Описание выполнено"
    }
  }

  // Функция для разделения статуса на строки
  const formatStatusText = (status: string) => {
    const words = status.split(" ")
    if (words.length <= 1) return status

    // Разделяем текст на две части: последнее слово и все остальные
    const lastWord = words[words.length - 1]
    const firstPart = words.slice(0, words.length - 1).join(" ")

    return (
      <>
        {firstPart}
        <br />
        {lastWord}
      </>
    )
  }

  if (isMobile) {
    return (
      <div className="bg-white rounded-xl p-4 shadow-around mb-4">
        <div className="flex">
          <div className="w-12 h-12 bg-gray-200 rounded-lg mr-3 overflow-hidden flex-shrink-0">
            <img
              src={`/placeholder.svg?height=48&width=48&query=product`}
              alt="Product"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm leading-tight">{item.name}</p>
            <p className="text-xs text-blue-600 mt-1">{item.sku}</p>
          </div>
          <div className="ml-2 flex-shrink-0">
            <div className="text-xs text-blue-600 whitespace-nowrap">{formatStatusText(getItemStatus(item))}</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 w-[550px] ml-28 shadow-md mb-6 flex items-center">
      <div className="w-10 h-10 bg-gray-200  dark:bg-gray-700  rounded-full mr-3 overflow-hidden">
        <img
          src={`/placeholder.svg?height=40&width=40&query=product`}
          alt="Product"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 overflow-hidden s">
        <p className="font-medium truncate">{item.name}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{item.sku}</p>
      </div>
      <div className="flex items-center ml-4">
        <div className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full text-center">
          {formatStatusText(getItemStatus(item))}
        </div>
      </div>
    </div>
  )
}
