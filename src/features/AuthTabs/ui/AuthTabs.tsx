import React from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { CONSTANTS } from "~/shared/lib/strings";
import { LoginForm } from "~/features/LoginForm";
import { RegisterForm } from "~/features/RegisterForm";



export const AuthTabs = () => {
  return (
    <div>
      <TabGroup>
        <TabList className="bg-frostedglass mx-auto flex h-11 w-52 items-center justify-center rounded-xl">
          <Tab className="tabClassname">
            {CONSTANTS.button.logIn}
          </Tab>
          <Tab className="tabClassname">
            {CONSTANTS.button.signUp}
          </Tab>
        </TabList>
        <TabPanels className="mt-3">
          <TabPanel>
            <LoginForm />
          </TabPanel>
          <TabPanel>
            <RegisterForm />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};