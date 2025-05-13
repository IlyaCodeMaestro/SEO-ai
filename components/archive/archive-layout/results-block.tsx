import { Star } from "lucide-react";

interface ResultsBlockProps {
  title: string;
  rating: number;
  isMobile: boolean;
}

export function ResultsBlock({ title, rating, isMobile }: ResultsBlockProps) {
  if (isMobile) {
    return (
      <div className="bg-[#f9f8f8]  rounded-xl shadow-md overflow-hidden">
        <div className="p-4">
          <div className="flex items-center mb-3">
            <h3 className="font-medium text-sm">{title}</h3>
          </div>
          <div className="flex items-center mb-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= 3
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 font-medium text-sm">{rating}</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 text-sm">Видимость:</span>
              <span className="font-medium text-sm">60 %</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 text-sm">
                Присутствие ключевых слов:
              </span>
              <span className="font-medium text-sm">70 %</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 text-sm">
                Упущено ключевых слов:
              </span>
              <span className="font-medium text-sm">10</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 text-sm">Упущено охвата:</span>
              <span className="font-medium text-sm">45 678 900</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f9f8f8]  dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <h3 className="font-medium">{title}</h3>
      </div>
      <div className="p-4">
        <div className="flex items-center mb-4">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 ${
                  star <= 3
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            ))}
          </div>
          <span className="ml-2 font-medium">{rating}</span>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-300 text-sm">
              Видимость:
            </span>
            <span className="font-medium ml-2 text-sm">60 %</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-300 text-sm">
              Присутствие ключевых слов:
            </span>
            <span className="font-medium ml-2 text-sm">70 %</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-300 text-sm">
              Упущено ключевых слов:
            </span>
            <span className="font-medium ml-2 text-sm">10</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-300 text-sm">
              Упущенный охват:
            </span>
            <span className="font-medium ml-2 text-sm">45 678 900</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700 dark:text-gray-300 text-sm">
              Наличие нерелевантных слов:
            </span>
            <span className="font-medium ml-2 text-sm">13</span>
          </div>
        </div>
      </div>
    </div>
  );
}
