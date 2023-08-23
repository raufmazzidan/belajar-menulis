const { notifications } = require("@mantine/notifications");
import {  NotificationProps } from "@mantine/core";

/**
 *
 * @typedef {import('@mantine/core').NotificationProps} NotificationProps -n
 *
 * @param {NotificationProps} properties -n
 * @returns {React.FC} -n
 */


const show = (properties) => {
  notifications.show({
    ...properties,
    radius: 'sm',
    withBorder: true,
    sx: {
      // height: 100,
      // padding: 24
    }
  });
}

const notify = {
  show
}

export default notify;