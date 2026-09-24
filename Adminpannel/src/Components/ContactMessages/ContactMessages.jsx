import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Eye,
  Trash2,
  CalendarDays,
  Users,
  Phone,
  CheckCircle2,
  X,
  Mail,
  MapPin,
  Clock3,
  MessageSquare,
  UserRound,
  BriefcaseBusiness,
  Check,
  MoreVertical,
  PhoneCall,
  ThumbsUp,
  ThumbsDown,
  Loader2,
} from "lucide-react";

import API from "../../api/axios"; // Adjust path if needed
import "./ContactMessages.css";

/* =========================================================
   STATUS CONFIG
========================================================= */

const statusOptions = [
  { value: "New", label: "New", icon: MessageSquare },
  { value: "Contacted", label: "Contacted", icon: PhoneCall },
  { value: "Interested", label: "Interested", icon: ThumbsUp },
  { value: "Not Interested", label: "Not Interested", icon: ThumbsDown },
  { value: "Converted", label: "Converted", icon: CheckCircle2 },
];

const ContactMessages = () => {
  /* =========================================================
     STATE
  ========================================================= */

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [dateFilter, setDateFilter] = useState("Last 30 Days");

  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [viewMessage, setViewMessage] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [openDropdown, setOpenDropdown] = useState(null);
  const [openStatusMenu, setOpenStatusMenu] = useState(null);

  const ContactMessagesDropdownRef = useRef(null);
  const ContactMessagesStatusMenuRef = useRef(null);

  const itemsPerPage = 8;

  /* =========================================================
     FETCH DATA FROM BACKEND (MONGODB)
  ========================================================= */

  const fetchContactLeads = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/contact-leads");

      if (response.data?.success && Array.isArray(response.data.data)) {
        // Normalize MongoDB data for display
        const normalized = response.data.data.map((item) => {
          const createdAt = item.createdAt ? new Date(item.createdAt) : new Date();

          // Format Date: e.g. "22 Sep 2026"
          const dateStr = createdAt.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });

          // Format Time: e.g. "10:35 AM"
          const timeStr = createdAt.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });

          // Full Name
          const fullName = item.surname
            ? `${item.name} ${item.surname}`.trim()
            : item.name;

          // Avatar Initials
          const nameParts = fullName.split(" ");
          const avatar =
            nameParts.length > 1
              ? `${nameParts[0][0] || ""}${nameParts[1][0] || ""}`.toUpperCase()
              : (fullName.slice(0, 2) || "U").toUpperCase();

          return {
            id: item._id, // MongoDB _id
            rawDate: createdAt,
            name: fullName,
            email: item.email || "N/A",
            phone: item.phone || "N/A",
            childrenAge: item.childAge || "—",
            city: item.city || "—",
            subject: item.subject || item.source || "General",
            message: item.message || "",
            status: item.status || "New",
            source: item.source || "Web",
            date: dateStr,
            time: timeStr,
            avatar: avatar,
          };
        });

        setMessages(normalized);
      } else {
        setMessages([]);
      }
    } catch (err) {
      console.error("Failed to fetch contact leads:", err);
      setError("Unable to load contact leads from server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactLeads();
  }, []);

  /* =========================================================
     CLOSE DROPDOWNS ON OUTSIDE CLICK
  ========================================================= */

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        ContactMessagesDropdownRef.current &&
        !ContactMessagesDropdownRef.current.contains(event.target)
      ) {
        setOpenDropdown(null);
      }

      if (
        ContactMessagesStatusMenuRef.current &&
        !ContactMessagesStatusMenuRef.current.contains(event.target)
      ) {
        setOpenStatusMenu(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  /* =========================================================
     FILTER DATA
  ========================================================= */

  const filteredMessages = useMemo(() => {
    const now = new Date();

    return messages.filter((message) => {
      const search = searchTerm.trim().toLowerCase();

      const matchesSearch =
        !search ||
        message.name.toLowerCase().includes(search) ||
        message.email.toLowerCase().includes(search) ||
        message.phone.toLowerCase().includes(search) ||
        message.subject.toLowerCase().includes(search) ||
        message.city.toLowerCase().includes(search) ||
        message.message.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "All Status" || message.status === statusFilter;

      const diffTime = Math.abs(now - message.rawDate);
      const daysDifference = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      let matchesDate = true;

      if (dateFilter === "Last 7 Days") {
        matchesDate = daysDifference <= 7;
      } else if (dateFilter === "Last 30 Days") {
        matchesDate = daysDifference <= 30;
      } else if (dateFilter === "Last 90 Days") {
        matchesDate = daysDifference <= 90;
      }

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [messages, searchTerm, statusFilter, dateFilter]);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages = Math.max(1, Math.ceil(filteredMessages.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const currentMessages = filteredMessages.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  /* =========================================================
     STATISTICS
  ========================================================= */

  const totalMessages = messages.length;
  const contactedMessages = messages.filter((item) => item.status === "Contacted").length;
  const newMessages = messages.filter((item) => item.status === "New").length;
  const interestedMessages = messages.filter((item) => item.status === "Interested").length;

  /* =========================================================
     HANDLERS
  ========================================================= */

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleDateChange = (value) => {
    setDateFilter(value);
    setCurrentPage(1);
  };

  /* =========================================================
     CHANGE INDIVIDUAL MESSAGE STATUS (PATCH TO BACKEND)
  ========================================================= */

  const handleMessageStatusChange = async (messageId, newStatus) => {
    try {
      // Optimistic update
      setMessages((prev) =>
        prev.map((msg) => (msg.id === messageId ? { ...msg, status: newStatus } : msg))
      );
      setOpenStatusMenu(null);

      await API.patch(`/contact-leads/${messageId}/status`, {
        status: newStatus,
      });
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update lead status on server. Reverting...");
      fetchContactLeads(); // Revert
    }
  };

  /* =========================================================
     SELECT CHECKBOXES
  ========================================================= */

  const isAllSelected =
    currentMessages.length > 0 &&
    currentMessages.every((message) => selectedIds.includes(message.id));

  const handleSelectAll = () => {
    const currentIds = currentMessages.map((message) => message.id);

    if (isAllSelected) {
      setSelectedIds((previous) =>
        previous.filter((id) => !currentIds.includes(id))
      );
    } else {
      setSelectedIds((previous) => [...new Set([...previous, ...currentIds])]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const handleRefresh = () => {
    setSearchTerm("");
    setStatusFilter("All Status");
    setDateFilter("Last 30 Days");
    setSelectedIds([]);
    setCurrentPage(1);
    setOpenDropdown(null);
    setOpenStatusMenu(null);
    fetchContactLeads();
  };

  /* =========================================================
     DELETE CONTACT LEAD (DELETE TO BACKEND)
  ========================================================= */

  const confirmDelete = async () => {
    if (!deleteMessage) return;

    try {
      setIsDeleting(true);
      await API.delete(`/contact-leads/${deleteMessage.id}`);

      setMessages((prev) => prev.filter((msg) => msg.id !== deleteMessage.id));
      setSelectedIds((prev) => prev.filter((id) => id !== deleteMessage.id));
      setDeleteMessage(null);

      if (currentMessages.length === 1 && safeCurrentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }
    } catch (err) {
      console.error("Failed to delete contact lead:", err);
      alert("Error deleting the lead from server. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  /* =========================================================
     STATUS ICON HELPER
  ========================================================= */

  const getStatusIcon = (status) => {
    const item = statusOptions.find((option) => option.value === status);
    return item ? item.icon : MessageSquare;
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="ContactMessagesPage">
      {/* HEADER */}
      <div className="ContactMessagesHeader">
        <div className="ContactMessagesHeaderLeft">
          <h1>Contact Messages</h1>
          <p>Manage and follow up with website enquiries directly from MongoDB.</p>
        </div>

        <div className="ContactMessagesHeaderDate">
          <CalendarDays size={16} />
          <span>
            {new Date().toLocaleDateString("en-GB", {
              weekday: "short",
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* STATISTICS */}
      <div className="ContactMessagesStats">
        <div className="ContactMessagesStatCard">
          <div className="ContactMessagesStatIcon ContactMessagesStatBlue">
            <Users size={22} />
          </div>
          <div className="ContactMessagesStatContent">
            <span>Total Messages</span>
            <div className="ContactMessagesStatNumberRow">
              <strong>{totalMessages}</strong>
            </div>
            <p>All database enquiries</p>
          </div>
        </div>

        <div className="ContactMessagesStatCard">
          <div className="ContactMessagesStatIcon ContactMessagesStatBlueLight">
            <Phone size={22} />
          </div>
          <div className="ContactMessagesStatContent">
            <span>Contacted</span>
            <div className="ContactMessagesStatNumberRow">
              <strong>{contactedMessages}</strong>
            </div>
            <p>You have contacted these</p>
          </div>
        </div>

        <div className="ContactMessagesStatCard">
          <div className="ContactMessagesStatIcon ContactMessagesStatInterested">
            <ThumbsUp size={22} />
          </div>
          <div className="ContactMessagesStatContent">
            <span>Interested</span>
            <div className="ContactMessagesStatNumberRow">
              <strong>{interestedMessages}</strong>
            </div>
            <p>Parents interested</p>
          </div>
        </div>

        <div className="ContactMessagesStatCard">
          <div className="ContactMessagesStatIcon ContactMessagesStatOrange">
            <Clock3 size={22} />
          </div>
          <div className="ContactMessagesStatContent">
            <span>New Messages</span>
            <div className="ContactMessagesStatNumberRow">
              <strong>{newMessages}</strong>
            </div>
            <p>Pending follow-up</p>
          </div>
        </div>
      </div>

      {/* ERROR NOTICE */}
      {error && (
        <div style={{ color: "#ef4444", marginBottom: "15px", fontWeight: 500 }}>
          {error}
        </div>
      )}

      {/* TABLE CARD */}
      <div className="ContactMessagesTableCard">
        {/* TOOLBAR */}
        <div className="ContactMessagesToolbar">
          <div className="ContactMessagesSearchBox">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search messages by name, email, phone or subject..."
              value={searchTerm}
              onChange={(event) => handleSearch(event.target.value)}
            />
            {searchTerm && (
              <button
                type="button"
                className="ContactMessagesSearchClear"
                onClick={() => handleSearch("")}
              >
                <X size={15} />
              </button>
            )}
          </div>

          <div className="ContactMessagesFilters" ref={ContactMessagesDropdownRef}>
            {/* STATUS FILTER */}
            <div className="ContactMessagesCustomDropdown">
              <button
                type="button"
                className={`ContactMessagesDropdownButton ${
                  openDropdown === "status"
                    ? "ContactMessagesDropdownButtonActive"
                    : ""
                }`}
                onClick={() =>
                  setOpenDropdown(openDropdown === "status" ? null : "status")
                }
              >
                <span>{statusFilter}</span>
                <ChevronDown
                  size={17}
                  className={
                    openDropdown === "status" ? "ContactMessagesChevronOpen" : ""
                  }
                />
              </button>

              {openDropdown === "status" && (
                <div className="ContactMessagesDropdownMenu">
                  {[
                    "All Status",
                    "New",
                    "Contacted",
                    "Interested",
                    "Not Interested",
                    "Converted",
                  ].map((status) => (
                    <button
                      key={status}
                      type="button"
                      className={`ContactMessagesDropdownOption ${
                        statusFilter === status
                          ? "ContactMessagesDropdownOptionSelected"
                          : ""
                      }`}
                      onClick={() => {
                        handleStatusChange(status);
                        setOpenDropdown(null);
                      }}
                    >
                      <span>{status}</span>
                      {statusFilter === status && <Check size={16} />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* DATE FILTER */}
            <div className="ContactMessagesCustomDropdown">
              <button
                type="button"
                className={`ContactMessagesDropdownButton ContactMessagesDateDropdownButton ${
                  openDropdown === "date"
                    ? "ContactMessagesDropdownButtonActive"
                    : ""
                }`}
                onClick={() =>
                  setOpenDropdown(openDropdown === "date" ? null : "date")
                }
              >
                <div className="ContactMessagesDropdownDateLabel">
                  <CalendarDays size={16} />
                  <span>{dateFilter}</span>
                </div>
                <ChevronDown
                  size={17}
                  className={
                    openDropdown === "date" ? "ContactMessagesChevronOpen" : ""
                  }
                />
              </button>

              {openDropdown === "date" && (
                <div className="ContactMessagesDropdownMenu ContactMessagesDateMenu">
                  {["Last 7 Days", "Last 30 Days", "Last 90 Days", "All Time"].map(
                    (date) => (
                      <button
                        key={date}
                        type="button"
                        className={`ContactMessagesDropdownOption ${
                          dateFilter === date
                            ? "ContactMessagesDropdownOptionSelected"
                            : ""
                        }`}
                        onClick={() => {
                          handleDateChange(date);
                          setOpenDropdown(null);
                        }}
                      >
                        <span>{date}</span>
                        {dateFilter === date && <Check size={16} />}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>

            {/* REFRESH */}
            <button
              type="button"
              className="ContactMessagesRefreshBtn"
              onClick={handleRefresh}
              disabled={loading}
            >
              <RefreshCw
                size={17}
                className={loading ? "animate-spin" : ""}
              />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* SELECTION BAR */}
        {selectedIds.length > 0 && (
          <div className="ContactMessagesSelectionBar">
            <div>
              <CheckCircle2 size={17} />
              <strong>{selectedIds.length}</strong>
              <span>
                message{selectedIds.length > 1 ? "s" : ""} selected
              </span>
            </div>
            <button type="button" onClick={() => setSelectedIds([])}>
              Clear selection
            </button>
          </div>
        )}

        {/* TABLE */}
        <div className="ContactMessagesTableWrapper">
          <table className="ContactMessagesTable">
            <thead>
              <tr>
                <th className="ContactMessagesCheckColumn">
                  <label className="ContactMessagesCheckbox">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={handleSelectAll}
                    />
                    <span />
                  </label>
                </th>
                <th>MESSAGE DETAILS</th>
                <th>PHONE</th>
                <th>CHILD&apos;S AGE</th>
                <th>CITY</th>
                <th>SUBJECT / SOURCE</th>
                <th>MESSAGE</th>
                <th>STATUS</th>
                <th>DATE</th>
                <th className="ContactMessagesActionColumn">ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="10" className="ContactMessagesEmptyState">
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, padding: 30 }}>
                      <Loader2 size={24} className="animate-spin" />
                      <span>Loading contact leads from database...</span>
                    </div>
                  </td>
                </tr>
              ) : currentMessages.length > 0 ? (
                currentMessages.map((message) => {
                  const StatusIcon = getStatusIcon(message.status);

                  return (
                    <tr
                      key={message.id}
                      className={
                        selectedIds.includes(message.id)
                          ? "ContactMessagesSelectedRow"
                          : ""
                      }
                    >
                      <td>
                        <label className="ContactMessagesCheckbox">
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(message.id)}
                            onChange={() => handleSelectOne(message.id)}
                          />
                          <span />
                        </label>
                      </td>

                      <td>
                        <div className="ContactMessagesPerson">
                          <div className="ContactMessagesAvatar">
                            {message.avatar}
                          </div>
                          <div className="ContactMessagesPersonInfo">
                            <strong>{message.name}</strong>
                            <span>{message.email}</span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="ContactMessagesPhone">
                          <Phone size={15} />
                          {message.phone}
                        </div>
                      </td>

                      <td>{message.childrenAge}</td>

                      <td>
                        <span className="ContactMessagesCity">
                          {message.city}
                        </span>
                      </td>

                      <td>
                        <span className="ContactMessagesSubject">
                          {message.subject}
                        </span>
                      </td>

                      <td>
                        <div
                          className="ContactMessagesMessage"
                          title={message.message}
                        >
                          {message.message}
                        </div>
                      </td>

                      <td>
                        <span
                          className={`ContactMessagesStatus ContactMessagesStatus${message.status.replace(
                            /\s/g,
                            ""
                          )}`}
                        >
                          <StatusIcon size={12} />
                          {message.status}
                        </span>
                      </td>

                      <td>
                        <div className="ContactMessagesDate">
                          <CalendarDays size={15} />
                          {message.date}
                        </div>
                      </td>

                      <td>
                        <div
                          className="ContactMessagesActions"
                          ref={
                            openStatusMenu === message.id
                              ? ContactMessagesStatusMenuRef
                              : null
                          }
                        >
                          {/* VIEW */}
                          <button
                            type="button"
                            className="ContactMessagesActionBtn ContactMessagesViewBtn"
                            title="View Message"
                            onClick={() => setViewMessage(message)}
                          >
                            <Eye size={17} />
                          </button>

                          {/* 3 DOT STATUS MENU */}
                          <div className="ContactMessagesMoreWrapper">
                            <button
                              type="button"
                              className={`ContactMessagesActionBtn ContactMessagesMoreBtn ${
                                openStatusMenu === message.id
                                  ? "ContactMessagesMoreBtnActive"
                                  : ""
                              }`}
                              title="Update Status"
                              onClick={() =>
                                setOpenStatusMenu(
                                  openStatusMenu === message.id
                                    ? null
                                    : message.id
                                )
                              }
                            >
                              <MoreVertical size={17} />
                            </button>

                            {openStatusMenu === message.id && (
                              <div className="ContactMessagesStatusMenu">
                                <div className="ContactMessagesStatusMenuHeader">
                                  <span>Update Status</span>
                                  <small>{message.name}</small>
                                </div>

                                <div className="ContactMessagesStatusOptions">
                                  {statusOptions.map((option) => {
                                    const OptionIcon = option.icon;
                                    const isActive =
                                      message.status === option.value;

                                    return (
                                      <button
                                        type="button"
                                        key={option.value}
                                        className={`ContactMessagesStatusOption ContactMessagesStatusOption${option.value.replace(
                                          /\s/g,
                                          ""
                                        )} ${
                                          isActive
                                            ? "ContactMessagesStatusOptionActive"
                                            : ""
                                        }`}
                                        onClick={() =>
                                          handleMessageStatusChange(
                                            message.id,
                                            option.value
                                          )
                                        }
                                      >
                                        <span className="ContactMessagesStatusOptionIcon">
                                          <OptionIcon size={15} />
                                        </span>
                                        <span className="ContactMessagesStatusOptionText">
                                          <strong>{option.label}</strong>
                                        </span>
                                        {isActive && <Check size={16} />}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                          </div>

                          {/* DELETE */}
                          <button
                            type="button"
                            className="ContactMessagesActionBtn ContactMessagesDeleteBtn"
                            title="Delete Message"
                            onClick={() => setDeleteMessage(message)}
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="10" className="ContactMessagesEmptyState">
                    <div>
                      <div className="ContactMessagesEmptyIcon">
                        <Search size={28} />
                      </div>
                      <strong>No messages found</strong>
                      <span>Try changing your search or filters.</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="ContactMessagesTableFooter">
          <div className="ContactMessagesShowing">
            Showing{" "}
            <strong>
              {filteredMessages.length === 0 ? 0 : startIndex + 1}
            </strong>{" "}
            to{" "}
            <strong>
              {Math.min(startIndex + itemsPerPage, filteredMessages.length)}
            </strong>{" "}
            of <strong>{filteredMessages.length}</strong> messages
          </div>

          <div className="ContactMessagesPagination">
            <button
              type="button"
              className="ContactMessagesPageBtn ContactMessagesArrowBtn"
              disabled={safeCurrentPage === 1}
              onClick={() =>
                setCurrentPage((prev) => Math.max(prev - 1, 1))
              }
            >
              <ChevronLeft size={18} />
            </button>

            {pageNumbers.map((page) => (
              <button
                type="button"
                key={page}
                className={`ContactMessagesPageBtn ${
                  safeCurrentPage === page
                    ? "ContactMessagesActivePage"
                    : ""
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              className="ContactMessagesPageBtn ContactMessagesArrowBtn"
              disabled={safeCurrentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* VIEW MODAL */}
      {viewMessage && (
        <div
          className="ContactMessagesModalOverlay"
          onClick={() => setViewMessage(null)}
        >
          <div
            className="ContactMessagesViewModal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="ContactMessagesModalHeader">
              <div>
                <span className="ContactMessagesModalEyebrow">
                  Message Details
                </span>
                <h2>Contact Enquiry</h2>
                <p>Complete information submitted by the parent.</p>
              </div>
              <button
                type="button"
                className="ContactMessagesModalClose"
                onClick={() => setViewMessage(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="ContactMessagesProfile">
              <div className="ContactMessagesLargeAvatar">
                {viewMessage.avatar}
              </div>
              <div className="ContactMessagesProfileInfo">
                <h3>{viewMessage.name}</h3>
                <span>{viewMessage.email}</span>
                <div className="ContactMessagesProfileStatus">
                  <span
                    className={`ContactMessagesStatus ContactMessagesStatus${viewMessage.status.replace(
                      /\s/g,
                      ""
                    )}`}
                  >
                    {viewMessage.status}
                  </span>
                  <span className="ContactMessagesProfileDate">
                    <CalendarDays size={14} />
                    {viewMessage.date} at {viewMessage.time}
                  </span>
                </div>
              </div>
            </div>

            <div className="ContactMessagesDetailsGrid">
              <div className="ContactMessagesDetailItem">
                <span><Phone size={16} /> Phone Number</span>
                <strong>{viewMessage.phone}</strong>
              </div>
              <div className="ContactMessagesDetailItem">
                <span><MapPin size={16} /> City</span>
                <strong>{viewMessage.city}</strong>
              </div>
              <div className="ContactMessagesDetailItem">
                <span><UserRound size={16} /> Child&apos;s Age</span>
                <strong>{viewMessage.childrenAge}</strong>
              </div>
              <div className="ContactMessagesDetailItem">
                <span><BriefcaseBusiness size={16} /> Subject / Source</span>
                <strong>{viewMessage.subject}</strong>
              </div>
              <div className="ContactMessagesDetailItem">
                <span><Clock3 size={16} /> Submitted At</span>
                <strong>{viewMessage.time}</strong>
              </div>
              <div className="ContactMessagesDetailItem">
                <span><Mail size={16} /> Email</span>
                <strong>{viewMessage.email}</strong>
              </div>
            </div>

            <div className="ContactMessagesMessageBox">
              <div className="ContactMessagesMessageTitle">
                <MessageSquare size={18} />
                <span>Parent Message</span>
              </div>
              <p>{viewMessage.message}</p>
            </div>

            <div className="ContactMessagesModalFooter">
              <button
                type="button"
                className="ContactMessagesModalDoneBtn"
                onClick={() => setViewMessage(null)}
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteMessage && (
        <div
          className="ContactMessagesModalOverlay"
          onClick={() => !isDeleting && setDeleteMessage(null)}
        >
          <div
            className="ContactMessagesDeleteModal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="ContactMessagesDeleteIcon">
              <Trash2 size={26} />
            </div>
            <h2>Delete Message?</h2>
            <p>
              Are you sure you want to delete the message from{" "}
              <strong>{deleteMessage.name}</strong>?<br />
              This will permanently delete it from the MongoDB database.
            </p>

            <div className="ContactMessagesDeleteActions">
              <button
                type="button"
                className="ContactMessagesCancelDelete"
                disabled={isDeleting}
                onClick={() => setDeleteMessage(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="ContactMessagesConfirmDelete"
                disabled={isDeleting}
                onClick={confirmDelete}
              >
                <Trash2 size={17} />
                {isDeleting ? "Deleting..." : "Delete Message"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactMessages;