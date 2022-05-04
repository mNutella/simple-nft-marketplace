import { Tab } from "@headlessui/react";
import MainLayout from "@layouts/MainLayout";
import AddNFTForm from "@modules/marketplace/components/AddNFTForm";
import CreateNFTForm from "@modules/marketplace/components/CreateNFTForm";
import useTabCreate from "@common/hooks/useTabCreate";

export default function CreatePage() {
  const { defaultIndex, currentTabIndex, activeTabClassName, onTabChange } =
    useTabCreate();

  return (
    <MainLayout
      authorized
      className="lg:flex lg:h-screen lg:flex-col lg:justify-between"
    >
      <Tab.Group
        selectedIndex={currentTabIndex}
        defaultIndex={defaultIndex}
        onChange={onTabChange}
      >
        <Tab.List className="sticky top-[94px] mx-auto flex w-full justify-center bg-black p-2 text-xl z-10">
          <Tab className="rounded-l-full bg-neutral-1">
            <div
              className={`rounded-full px-4 py-2 hover:bg-neutral-2 ${activeTabClassName(
                0
              )}`}
            >
              Create
            </div>
          </Tab>
          <Tab className="rounded-r-full bg-neutral-1">
            <div
              className={`rounded-full px-4 py-2 hover:bg-neutral-2 ${activeTabClassName(
                1
              )}`}
            >
              Add
            </div>
          </Tab>
        </Tab.List>
        <Tab.Panels className="py-5">
          <Tab.Panel className="lg:h-[412px]">
            <CreateNFTForm />
          </Tab.Panel>
          <Tab.Panel className="lg:h-[412px]">
            <AddNFTForm />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </MainLayout>
  );
}
