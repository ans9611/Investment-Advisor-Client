curl "http://localhost:4741/change-password" \
  --include \
  --request PATCH \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "credentials": {
      "old": "'"${PASSWORD}"'",
      "new": "'"${PASSWORD}"'"
    }
  }'

echo
