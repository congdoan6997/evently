import { IEvent } from "@/lib/database/models/event.model";
import React from "react";
import Card from "./Card";
import Pagination from "./Pagination";

interface EventListComponentProps {
  data: IEvent[]; // You can replace 'any' with a more specific type for your events
  emptyTitle: string;
  emptySubtitle: string;
  collectionType?: "Events_Organized" | "My_Tickets" | "All_Events";
  page: number | string;
  limit?: number;
  totalPages?: number;
  urlParamName?: string;
}

const Collection: React.FC<EventListComponentProps> = ({
  data,
  emptyTitle,
  emptySubtitle,
  collectionType,
  page,
  totalPages = 0,
  urlParamName,
}) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data?.map((event) => {
              const hasOrderLink = collectionType === "Events_Organized";
              const hidePrice = collectionType === "My_Tickets";

              return (
                <li key={event._id} className="flex justify-center">
                  <Card
                    event={event}
                    hasOrderLink={hasOrderLink}
                    hidePrice={hidePrice}
                  />
                </li>
              );
            })}
          </ul>

          {totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              urlParamName={urlParamName}
            />
          )}
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
          <p className="p-regular-14">{emptySubtitle}</p>
        </div>
      )}
    </>
  );
};

export default Collection;
