package testing

import (
	"fmt"
	"reflect"
	"strings"
	"testing"
	"time"

	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

// Check the created at and updataed at timestamps are valid
func AssertTimestampsValid(t *testing.T, obj interface{}) {
	t.Helper()
	val := reflect.ValueOf(obj)
	if val.Kind() == reflect.Ptr {
		val = val.Elem()
	}
	createdField := val.FieldByName("CreatedAt")
	if createdField.IsValid() {
		createdAt, ok := createdField.Interface().(time.Time)
		require.True(t, ok, "CreatedAt Field is not a time.Time")
		assert.False(t, createdAt.IsZero(), "CreatedAt should not be zero")
	}
	updatedField := val.FieldByName("UpdatedAt")
	if updatedField.IsValid() {
		updatedAt, ok := updatedField.Interface().(time.Time)
		require.True(t, ok, "UpdatedAt Field is not a time.Time")
		assert.False(t, updatedAt.IsZero(), "UpdatedAt should not be zero")
	}

}

// AssertValidUUID checks that the UUID is valid and not nil
func AssertValidUUID(t *testing.T, id uuid.UUID, message ...string) {
	t.Helper()

	msg := "UUID should not be nil"
	if len(message) > 0 {
		msg = message[0]
	}

	assert.NotEqual(t, uuid.Nil, id, msg)

}

// Assert EqualExpectTime asserts that two objetcs are equal, ignoring time fields
func AssertEqualExpectTime(t *testing.T, expected, actual interface{}) {
	t.Helper()
	expectVal := reflect.ValueOf(expected)
	if expectVal.Kind() == reflect.Ptr {
		expectVal = expectVal.Elem()

	}

	actualVal := reflect.ValueOf(actual)
	if actualVal.Kind() == reflect.Ptr {
		actualVal = actualVal.Elem()
	}

	// ensureing same type
	require.Equal(t, actualVal.Type(), expectVal.Type(), "Types are Not equal")

	// Check fields
	for i := 0; i < expectVal.NumField(); i++ {
		field := expectVal.Type().Field(i)

		// Skip time fields
		if field.Type == reflect.TypeOf(time.Time{}) ||
			field.Type == reflect.TypeOf(&time.Time{}) {
			continue
		}

		expectedField := expectVal.Field(i)
		actualField := actualVal.Field(i)

		assert.Equal(
			t,
			expectedField.Interface(),
			actualField.Interface(),
			fmt.Sprintf("field %s should be equal", field.Name),
		)
	}
}

// AssertStringContains checks if a string contains all specified substrings
func AssertStringContains(t *testing.T, s string, substrings ...string) {
	t.Helper()

	for _, sub := range substrings {
		assert.True(
			t,
			strings.Contains(s, sub),
			fmt.Sprintf("expected string to contain '%s', but it didn't: %s", sub, s),
		)
	}
}
