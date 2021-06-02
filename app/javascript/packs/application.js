import Rails from "@rails/ujs";
import Turbolinks from "turbolinks";
import * as ActiveStorage from "@rails/activestorage";

Rails.start();
Turbolinks.start();
ActiveStorage.start();
require.context("../images", true);

import "channels";
import "controllers";
import "stylesheets";
import "scripts";

import "@fortawesome/fontawesome-free/css/all";
