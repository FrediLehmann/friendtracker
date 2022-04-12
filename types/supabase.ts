/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/": {
    get: {
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/emails": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.emails.id"];
          created_at?: parameters["rowFilter.emails.created_at"];
          owner?: parameters["rowFilter.emails.owner"];
          email?: parameters["rowFilter.emails.email"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["emails"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** emails */
          emails?: definitions["emails"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.emails.id"];
          created_at?: parameters["rowFilter.emails.created_at"];
          owner?: parameters["rowFilter.emails.owner"];
          email?: parameters["rowFilter.emails.email"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.emails.id"];
          created_at?: parameters["rowFilter.emails.created_at"];
          owner?: parameters["rowFilter.emails.owner"];
          email?: parameters["rowFilter.emails.email"];
        };
        body: {
          /** emails */
          emails?: definitions["emails"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/phones": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.phones.id"];
          created_at?: parameters["rowFilter.phones.created_at"];
          phone?: parameters["rowFilter.phones.phone"];
          owner?: parameters["rowFilter.phones.owner"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["phones"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** phones */
          phones?: definitions["phones"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.phones.id"];
          created_at?: parameters["rowFilter.phones.created_at"];
          phone?: parameters["rowFilter.phones.phone"];
          owner?: parameters["rowFilter.phones.owner"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.phones.id"];
          created_at?: parameters["rowFilter.phones.created_at"];
          phone?: parameters["rowFilter.phones.phone"];
          owner?: parameters["rowFilter.phones.owner"];
        };
        body: {
          /** phones */
          phones?: definitions["phones"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/profiles": {
    get: {
      parameters: {
        query: {
          created_at?: parameters["rowFilter.profiles.created_at"];
          owner?: parameters["rowFilter.profiles.owner"];
          /** User name */
          user_name?: parameters["rowFilter.profiles.user_name"];
          /** Avatar image url */
          avatar_url?: parameters["rowFilter.profiles.avatar_url"];
          /** Users handle */
          user_handle?: parameters["rowFilter.profiles.user_handle"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["profiles"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** profiles */
          profiles?: definitions["profiles"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          created_at?: parameters["rowFilter.profiles.created_at"];
          owner?: parameters["rowFilter.profiles.owner"];
          /** User name */
          user_name?: parameters["rowFilter.profiles.user_name"];
          /** Avatar image url */
          avatar_url?: parameters["rowFilter.profiles.avatar_url"];
          /** Users handle */
          user_handle?: parameters["rowFilter.profiles.user_handle"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          created_at?: parameters["rowFilter.profiles.created_at"];
          owner?: parameters["rowFilter.profiles.owner"];
          /** User name */
          user_name?: parameters["rowFilter.profiles.user_name"];
          /** Avatar image url */
          avatar_url?: parameters["rowFilter.profiles.avatar_url"];
          /** Users handle */
          user_handle?: parameters["rowFilter.profiles.user_handle"];
        };
        body: {
          /** profiles */
          profiles?: definitions["profiles"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
}

export interface definitions {
  /** @description Users email addresses, used to identify or find friends */
  emails: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string;
    /** Format: uuid */
    owner: string;
    /** Format: text */
    email: string;
  };
  /** @description Users phone numbers */
  phones: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string;
    /** Format: text */
    phone?: string;
    /** Format: uuid */
    owner?: string;
  };
  /** @description User profile */
  profiles: {
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string;
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    owner: string;
    /**
     * Format: text
     * @description User name
     */
    user_name?: string;
    /**
     * Format: text
     * @description Avatar image url
     */
    avatar_url?: string;
    /**
     * Format: text
     * @description Users handle
     */
    user_handle?: string;
  };
}

export interface parameters {
  /**
   * @description Preference
   * @enum {string}
   */
  preferParams: "params=single-object";
  /**
   * @description Preference
   * @enum {string}
   */
  preferReturn: "return=representation" | "return=minimal" | "return=none";
  /**
   * @description Preference
   * @enum {string}
   */
  preferCount: "count=none";
  /** @description Filtering Columns */
  select: string;
  /** @description On Conflict */
  on_conflict: string;
  /** @description Ordering */
  order: string;
  /** @description Limiting and Pagination */
  range: string;
  /**
   * @description Limiting and Pagination
   * @default items
   */
  rangeUnit: string;
  /** @description Limiting and Pagination */
  offset: string;
  /** @description Limiting and Pagination */
  limit: string;
  /** @description emails */
  "body.emails": definitions["emails"];
  /** Format: bigint */
  "rowFilter.emails.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.emails.created_at": string;
  /** Format: uuid */
  "rowFilter.emails.owner": string;
  /** Format: text */
  "rowFilter.emails.email": string;
  /** @description phones */
  "body.phones": definitions["phones"];
  /** Format: bigint */
  "rowFilter.phones.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.phones.created_at": string;
  /** Format: text */
  "rowFilter.phones.phone": string;
  /** Format: uuid */
  "rowFilter.phones.owner": string;
  /** @description profiles */
  "body.profiles": definitions["profiles"];
  /** Format: timestamp with time zone */
  "rowFilter.profiles.created_at": string;
  /** Format: uuid */
  "rowFilter.profiles.owner": string;
  /**
   * Format: text
   * @description User name
   */
  "rowFilter.profiles.user_name": string;
  /**
   * Format: text
   * @description Avatar image url
   */
  "rowFilter.profiles.avatar_url": string;
  /**
   * Format: text
   * @description Users handle
   */
  "rowFilter.profiles.user_handle": string;
}

export interface operations {}

export interface external {}
